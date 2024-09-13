import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price: process.env.STRIPE_PRICE_ID, // You need to create this in your Stripe dashboard
            quantity: 1,
          },
        ],
        mode: 'subscription',
        success_url: `${req.headers.origin}/subscription?success=true`,
        cancel_url: `${req.headers.origin}/subscription?canceled=true`,
        client_reference_id: req.body.userId,
      });

      res.status(200).json({ sessionId: session.id });
    } catch (error) {
      console.error('Stripe error:', error);
      res.status(500).json({ error: 'An error occurred while creating the checkout session.' });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
