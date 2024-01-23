import type { NextApiRequest, NextApiResponse } from 'next';
import { GeoLocation } from '~/interfaces/types';
import { RideService } from '~/server/services/RideService';
import { calculateDistance } from '~/server/utils/MapsService';

interface IRequest extends NextApiRequest {
  body: {
    pickupLocation: GeoLocation,
    dropoffLocation: GeoLocation
  }
}

export default async function handler(
  req: IRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  const { pickupLocation, dropoffLocation } = req.body;
  try {
    const ride = new RideService()
    const distance = await calculateDistance(pickupLocation, dropoffLocation)
    const price = await ride.calculateFare(pickupLocation, dropoffLocation)

    const response = {
      ...distance?.elements[0],
      price
    }

    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
