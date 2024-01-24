import type { NextApiRequest, NextApiResponse } from 'next';
import { DriverStatus } from '~/interfaces/types';
import { DriverService } from '~/server/services/DriverService';
import { RideService } from '~/server/services/RideService';

type ResponseData = {
  message?: string;
  error?: string;
};

interface IRequest extends NextApiRequest {
  body: {
    driverId: number,
  }
}

export default async function acceptRideHandler(
  req: IRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'PATCH') {
    res.setHeader('Allow', ['PATCH']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const rideId = parseInt(req.query.id as string);
    const { driverId } = req.body;

    if (!rideId || !driverId) {
      return res.status(400).json({ error: 'Missing IDs' });
    }

    const ride = new RideService();
    const driver = new DriverService();
    const driverExists = await driver.getDriverDetails(driverId);

    if (!driverExists) {
      return res.status(400).json({ error: 'Invalid driver' });
    }

    const newAvailableDriver = await driver.findAvailableDriver();
    await ride.update({ rideId, driverId: newAvailableDriver?.id });
    await driver.update(driverId, DriverStatus.AVAILABLE);
    if (newAvailableDriver?.id) {
      await driver.update(newAvailableDriver?.id, DriverStatus.RESERVED);
    }

    return res.status(200).json({ message: 'Ride declined successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
