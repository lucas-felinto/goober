import type { NextApiRequest, NextApiResponse } from 'next';
import { DriverStatus, Status } from '~/interfaces/types';
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

    if (isNaN(rideId) || isNaN(driverId)) {
      return res.status(400).json({ error: 'Invalid ride or driver ID' });
    }

    const ride = new RideService()
    const rideExists = await ride.findOne({ id: rideId, driverId })

    if (!rideExists) {
      // checks exists and if the ride is assign to the correct driver
      return res.status(400).json({ error: 'You are not able to complete this ride.' });
    }

    const driver = new DriverService()
    await driver.update(driverId, DriverStatus.AVAILABLE)

    await ride.update({ status: Status.COMPLETED, rideId, driverId });
    return res.status(200).json({ message: 'Ride completed' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
