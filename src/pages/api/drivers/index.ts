import type { NextApiRequest, NextApiResponse } from 'next';
import { DriverService } from '~/server/services/DriverService';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const driverService = new DriverService();
    const drivers = await driverService.fetchAll();
    return res.status(200).json(drivers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
