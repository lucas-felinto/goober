import type { NextApiRequest, NextApiResponse } from 'next';
import { Ride } from '~/interfaces/types';
import DeclineRides from '~/server/services/DeclineRides';
import { DriverService } from '~/server/services/DriverService';
import { RideService } from '~/server/services/RideService';

type ResponseData = {
  error?: string;
} | Ride | null;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const { id } = req.query;
    const driverId = parseInt(id as string);

    if (isNaN(driverId)) {
      return res.status(400).json({ error: 'Invalid or missing driver ID' });
    }

    const driverService = new DriverService();
    const driverDetails = await driverService.getDriverDetails(driverId);

    if (!driverDetails) {
      return res.status(404).json({ error: 'Driver not found' });
    }

    const rideService = new RideService();
    const rideRequest = await rideService.getRideRequestForDriver(driverId);

    if (rideRequest?.id) {
      const declinedRides = new DeclineRides();
      const declinedRide = await declinedRides.fetchDeclinedRide(driverId, rideRequest.id);

      if (declinedRide) return res.status(400).json({ error: 'Ride already declined by driver' });
    }

    return res.status(200).json(rideRequest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
