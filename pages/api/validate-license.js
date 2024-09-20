//import { PrismaClient } from '@prisma/client';
import prisma from '../../lib/prisma';
//const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { licenseKey } = req.body;

  if (!licenseKey) {
    return res.status(400).json({ error: 'License key is required' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { licenseKey },
    });

    if (!user) {
      return res.status(404).json({ error: 'License key not found' });
    }

    // Get the current date
    const currentDate = new Date();

    // Compare current date with subscription expiry date
    if (user.subscriptionExpiryDate && currentDate < new Date(user.subscriptionExpiryDate)) {
      return res.status(200).json({ valid: true, active: true });
    } else {
      return res.status(200).json({ valid: true, active: false });
    }
  } catch (error) {
    console.error('Error validating license:', error);
    return res.status(500).json({ error: 'Internal server error' });
  } finally {
    await prisma.$disconnect();
  }
}
