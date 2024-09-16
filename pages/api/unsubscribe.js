import { getSession } from 'next-auth/react';
import { getServerSession } from "next-auth/next";
import prisma from '../../lib/prisma';
import Stripe from 'stripe';
import { authOptions } from "./auth/[...nextauth]"
//import { sendEmail } from '../../lib/email';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  let session;
  try {
    session = await getServerSession(req, res, authOptions);
    console.log('Session object:', session);
  } catch (error) {
    console.error('Error getting session:', error);
    console.error('Request headers:', req.headers);
    console.error('Request body:', req.body);
    console.error('Timestamp:', new Date().toISOString());
    return res.status(500).json({ error: 'Failed to get session' });
  }

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'POST') {
    try {
      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
      });
      console.log('user', JSON.stringify(user))

      if (user.subscriptionId) {
        const updatedSubscription = await stripe.subscriptions.update(user.subscriptionId, {cancel_at_period_end: true});
        
        await prisma.user.update({
          where: { email: session.user.email },
          data: {
            subscriptionStatus: 'inactive',
            subscriptionId: null,
            subscriptionExpiryDate: null,
          },
        });

        res.status(200).json({ message: 'Subscription cancelled successfully' });
      } else {
        res.status(400).json({ error: 'No active subscription found' });
      }
    } catch (error) {
      console.error('Error cancelling subscription:', error);
      res.status(500).json({ error: 'Failed to cancel subscription' });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
