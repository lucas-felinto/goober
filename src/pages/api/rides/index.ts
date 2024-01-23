import type { NextApiRequest, NextApiResponse } from 'next'
import { DriverStatus, GeoLocation, Ride, Rider } from '~/interfaces/types';
import { DriverService } from '~/server/services/DriverService';
import { RideService } from '~/server/services/RideService';

type ResponseData = {
  ride?: Ride
  message?: string
  error?: string
}

interface IRequest extends NextApiRequest {
  body: {
    riderId: number,
    distance: string,
    coordinates: string,
    rider: Rider,
    fare: number,
    pickupAddress: string,
    dropoffAddress: string
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
    const { riderId, fare, distance, coordinates, pickupAddress, dropoffAddress } = req.body;

    if (!riderId || !fare || !distance || !pickupAddress || !dropoffAddress) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const driver = new DriverService()
    const availableDriver = await driver.findAvailableDriver()

    if (!availableDriver) {
      return res.status(400).json({ message: "No available driver at the moment, try again later" })
    }

    const ride = new RideService()
    const response = await ride.create({ riderId, driverId: availableDriver.id, fare, distance, coordinates, pickupAddress, dropoffAddress })
    await driver.update(availableDriver.id, DriverStatus.RESERVED);

    return res.status(201).json({ ride: response })
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}