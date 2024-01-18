import type { NextApiRequest, NextApiResponse } from 'next'
import { GeoLocation, Ride } from '~/interfaces/types';
import { DriverService } from '~/server/services/DriverService';
import { RideService } from '~/server/services/RideService';
 
type ResponseData = {
  ride?: Ride
  message?: string
  error?: string
}

interface Request extends NextApiRequest {
  body: {
    riderId: number,
    pickupLocation: GeoLocation,
    dropoffLocation: GeoLocation
  }
}
 
export default async function handler(
  req: Request,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  
  try {
    const { riderId, pickupLocation, dropoffLocation } = req.body;
    
    if (!riderId || !pickupLocation || !dropoffLocation) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const driver = new DriverService()
    const availableDriver = await driver.findAvailableDriver()

    if (!availableDriver) {
      return res.status(200).json({ message: "No available driver at the moment, try again later"})
    }

    const ride = new RideService()
    const fare = await ride.calculateFare(pickupLocation, dropoffLocation)
    const response = await ride.create(riderId, availableDriver.id, fare)
    
    return res.status(201).json({ ride: response })
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}