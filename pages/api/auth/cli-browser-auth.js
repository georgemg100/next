import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const session = await getSession({ req });

    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Generate a temporary token for CLI authentication
      const tempToken = generateTempToken();
      await prisma.user.update({
        where: { id: user.id },
        data: { tempToken },
      });

      res.status(200).json({ token: tempToken });
    } catch (error) {
      console.error('Error in cli-browser-auth:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end();
  }
}

function generateTempToken() {
  return Math.random().toString(36).substr(2, 10);
}
