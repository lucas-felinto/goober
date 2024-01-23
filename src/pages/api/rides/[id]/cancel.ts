import type { NextApiRequest, NextApiResponse } from 'next';
import { CanceledBy, DriverStatus, Status } from '~/interfaces/types';
import { DriverService } from '~/server/services/DriverService';
import { RideService } from '~/server/services/RideService';

type ResponseData = {
  message?: string;
  error?: string;
};

interface IRequest extends NextApiRequest {
  body: {
    driverId?: number,
    riderId?: number,
    canceledBy: string
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
    const { driverId, riderId } = req.body;
    const id = driverId ? driverId : riderId!

    if (isNaN(rideId) || isNaN(id)) {
      return res.status(400).json({ error: 'Invalid ride or driver ID' });
    }

    const canceledBy = driverId ? CanceledBy.DRIVER : CanceledBy.RIDER

    const ride = new RideService()
    const rideExists = await ride.findOne({ id: rideId, driverId, riderId })

    if (!rideExists) {
      // checks exists and if the ride is assign to the correct driver and rider
      return res.status(400).json({ error: 'You are not able to cancel this ride.' });
    }

    if (rideExists.driverId) {
      const driver = new DriverService()
      await driver.update(rideExists.driverId, DriverStatus.AVAILABLE)
    }

    await ride.update({ status: Status.CANCELED, rideId, driverId, riderId, canceledBy });

    return res.status(200).json({ message: 'Ride canceled' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
