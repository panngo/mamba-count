import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const countRecords = await prisma.mambaCount.count();

      res.status(200).json({ totalRecords: countRecords });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch count' });
    }
  } else if (req.method === 'POST') {
    try {
      const count = await prisma.mambaCount.create({
        data: { created_at: new Date() },
      });

      res.status(200).json(count);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update count' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}