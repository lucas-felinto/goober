import type { NextApiRequest, NextApiResponse } from 'next';
import { Rider } from '~/interfaces/types';
import { RiderService } from '~/server/services/RiderService';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const riderService = new RiderService();
    const riders = await riderService.fetchAll();
    return res.status(200).json(riders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
