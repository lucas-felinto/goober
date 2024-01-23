import type { NextApiRequest, NextApiResponse } from 'next';
import { Ride } from '~/interfaces/types';
import { RideService } from '~/server/services/RideService';

type ResponseData = {
  error?: string;
} | Ride | null;

interface IRequest extends NextApiRequest {
  body: {
    driverId?: number,
    riderId?: number
  }
}

export default async function handler(
  req: IRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  try {
    const { driverId, riderId } = req.body

    if (!driverId && !riderId) {
      return res.status(400).json({ error: 'Invalid or missing IDs' });
    }

    const rideService = new RideService();
    const ongoingRide = await rideService.findOngoingRide(driverId, riderId);

    return res.status(200).json(ongoingRide);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
