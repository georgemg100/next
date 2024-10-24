import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { token } = req.body;
      const session = await getSession({ req });

      if (!session) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Here you can implement additional logic for CLI authentication
      // For example, you might want to generate and store a specific CLI token

      res.status(200).json({ message: 'CLI authentication successful', userId: user.id });
    } catch (error) {
      console.error('CLI authentication error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
