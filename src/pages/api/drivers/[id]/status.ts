import type { NextApiRequest, NextApiResponse } from 'next';
import { DriverStatus, Status } from '~/interfaces/types';
import { DriverService } from '~/server/services/DriverService';

type ResponseData = {
  message?: string;
  error?: string;
};

interface IRequest extends NextApiRequest {
  body: {
    status: DriverStatus.AVAILABLE | DriverStatus.ON_RIDE,
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
    const driverId = parseInt(req.query.id as string);
    const { status } = req.body;

    if (isNaN(driverId)) {
      return res.status(400).json({ error: 'Invalid ride or driver ID' });
    }

    const driver = new DriverService()

    await driver.update(driverId, status);

    return res.status(200).json({ message: 'Ride in progress' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
