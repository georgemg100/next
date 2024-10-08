import { buffer } from 'micro';
import Stripe from 'stripe';
import prisma from '../../lib/prisma';
//import { sendSubscriptionConfirmationEmail } from '../../lib/email';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export const config = {
  api: {
    bodyParser: false,
  },
};

async function handleCheckoutSessionCompleted(session) {
  const userId = session.client_reference_id;
        const subscriptionId = session.subscription;
        //const expiry = new Date(session.current_period_end * 1000)
        // Fetch the subscription details
      const subscription = await stripe.subscriptions.retrieve(session.subscription);
      
      // The current_period_end is a Unix timestamp
      const expirationDate = new Date(subscription.current_period_end * 1000);

        console.log('expiry', expirationDate)
        console.log('session', JSON.stringify(session))
        console.log('userId from event session', userId)
        console.log('subscriptionId from event session', subscriptionId)
        // Update user's subscription status in the database
        const updatedUser = await prisma.user.update({
          where: { id: userId },
          data: {
            subscriptionStatus: 'active',
            subscriptionId: subscriptionId,
            subscriptionExpiryDate: expirationDate
          },
        });
        //await sendSubscriptionConfirmationEmail(updatedUser.email, "")
  // await sendEmail({
  //   to: user.email,
  //   subject: 'Subscription Confirmed',
  //   text: `Thank you for subscribing! Your subscription is now active.`,
  // });
}

async function handleCustomerSubscriptionAutoRenewed(paymentSucceeded) {
  // const userId = session.client_reference_id;
  // const subscriptionId = session.subscription;
  // const expiry = new Date(session.expires_at * 1000)
  // console.log('expiry', expiry)
  // console.log('session', JSON.stringify(session))
  // console.log('userId from event session', userId)
  // console.log('subscriptionId from event session', subscriptionId)
  // // Update user's subscription status in the database
  console.log(paymentSucceeded)
  if (paymentSucceeded.subscription) {
    try {
      // Fetch the subscription details
      const subscription = await stripe.subscriptions.retrieve(paymentSucceeded.subscription);
      
      // The current_period_end is a Unix timestamp
      const expirationDate = new Date(subscription.current_period_end * 1000);
      
      console.log(`Subscription renewed successfully. New expiration date: ${expirationDate}`);
      console.log('subscription id: ' + subscription.id)
      // Here you can update your database, send emails, etc.
      const updatedUser = await prisma.user.update({
        where: { subscriptionId: subscription.id },
        data: {
          subscriptionStatus: 'active',
          subscriptionId: subscription.id,
          subscriptionExpiryDate: expirationDate
        },
      });
    } catch (error) {
      console.error('Error fetching subscription details:', error);
    }
  }

  
}

async function handleCustomerSubscriptionDeleted(subscription) {
  const user = await prisma.user.update({
    where: { subscriptionId: subscription.id },
    data: { subscriptionStatus: 'inactive', subscriptionId: null },
  });

  // await sendEmail({
  //   to: user.email,
  //   subject: 'Subscription Cancelled',
  //   text: `Your subscription has been cancelled. We're sorry to see you go!`,
  // });
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const buf = await buffer(req);
    const sig = req.headers['stripe-signature'];

    let event;

    try {
      event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
    } catch (err) {
      console.error(`Webhook Error: ${err.message}`);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event.data.object);
        break;
      case 'customer.subscription.deleted':
        await handleCustomerSubscriptionDeleted(event.data.object);
        break;
      case 'invoice.paid':
        await handleCustomerSubscriptionAutoRenewed(event.data.object);
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
