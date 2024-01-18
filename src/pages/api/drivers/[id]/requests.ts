import type { NextApiRequest, NextApiResponse } from 'next';
import { DriverStatus, Ride } from '~/interfaces/types';
import { DriverService } from '~/server/services/DriverService';
import { RideService } from '~/server/services/RideService';

type ResponseData = {
  rideRequests?: Ride | null;
  error?: string;
};
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
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

    if (driverDetails.status !== DriverStatus.AVAILABLE) {
      return res.status(400).json({ error: 'Not available for new requests' });
    }

    const rideService = new RideService();
    const rideRequests = await rideService.getRideRequestsForDriver(driverId);
    
    res.status(200).json({ rideRequests });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
