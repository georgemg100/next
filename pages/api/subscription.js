//import { getSession } from 'next-auth/react';
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]"
import prisma from "../../lib/prisma"
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    let session;
    try {
      session = await getServerSession(req,res,authOptions);
      console.log('Session object:', session); // Log the session object for debugging
    } catch (error) {
      console.error('Error getting session:', error);
      console.error('Request headers:', req.headers);
      console.error('Request body:', req.body);
      console.error('Timestamp:', new Date().toISOString());
      return res.status(500).json({ error: 'Failed to get session' });
    }

    if (!session) {
      console.error('Session is null');
      return res.status(401).json({ error: 'Unauthorized' });
    }
    console.log('session user', session.user)
    console.log('session userId: ', session.userId)
    try {
      const checkoutSession = await stripe.checkout.sessions.create({
        line_items: [
          {
            price: process.env.STRIPE_PRICE_ID,
            quantity: 1,
          },
        ],
        mode: 'subscription',
        success_url: `${process.env.NEXTAUTH_URL}/subscription?success=true`,
        cancel_url: `${process.env.NEXTAUTH_URL}/subscription?canceled=true`,
        customer_email: session.user.email,
        client_reference_id: session.userId
      });
      console.log('checkoutSession', JSON.stringify(checkoutSession))
      // Update user's subscription status
      // await prisma.user.update({
      //   where: { email: session.user.email },
      //   data: {
      //     subscriptionStatus: 'active',
      //     subscriptionId: checkoutSession.subscription,
      //     subscriptionExpiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      //   },
      // });

      res.status(200).json({ sessionId: checkoutSession.id });
    } catch (error) {
      console.error('Error creating checkout session:', error);
      res.status(500).json({ error: 'Failed to create checkout session' });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
