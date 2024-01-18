import type { NextApiRequest, NextApiResponse } from 'next';
import { Actions, CanceledBy, Status } from '~/interfaces/types';
import { RideService } from '~/server/services/RideService';

type ResponseData = {
  message?: string;
  error?: string;
};

interface Request extends NextApiRequest {
  body: {
    driverId?: number,
    riderId?: number
  }
}

export default async function acceptRideHandler(
  req: Request,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'PATCH') {
    res.setHeader('Allow', ['PATCH']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const rideId = parseInt(req.query.id as string);
    const { driverId, riderId } = req.body;
    const id = driverId ? driverId : riderId!

    if (isNaN(rideId) || isNaN(id)) {
      return res.status(400).json({ error: 'Invalid ride or driver ID' });
    }

    const canceledBy = driverId ? CanceledBy.DRIVER : CanceledBy.RIDER

    const ride = new RideService()
    const update = await ride.update(Status.CANCELED, rideId, driverId, riderId, canceledBy);

    if (!update) {
      // this checks if the ride is assign to the driver id
      return res.status(400).json({ error: 'You are not able to cancel this ride.' });
    }

    return res.status(200).json({ message: 'Ride canceled' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
