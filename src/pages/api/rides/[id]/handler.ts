import type { NextApiRequest, NextApiResponse } from 'next';
import { Actions } from '~/interfaces/types';
import { DriverService } from '~/server/services/DriverService';
import { RideService } from '~/server/services/RideService';

type ResponseData = {
  message?: string;
  error?: string;
};

interface IRequest extends NextApiRequest {
  body: {
    driverId: number,
    action: Actions.ACCEPT | Actions.DECLINE
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
    const { driverId, action } = req.body;

    if (isNaN(rideId) || isNaN(driverId)) {
      return res.status(400).json({ error: 'Invalid ride or driver ID' });
    }

    const driver = new DriverService()
    const driverExists = driver.getDriverDetails(driverId)

    if (!driverExists) {
      return res.status(400).json({ error: 'Invalid driver' });
    }

    if (action === Actions.ACCEPT) {
      const ride = new RideService()
      const result = await ride.handlerRideRequest(rideId, driverId);

      if (!result) {
        return res.status(404).json({ error: 'Ride not found or already accepted by another driver' });
      }

      return res.status(200).json({ message: 'Ride accepted successfully' });
    }
    res.end()
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
