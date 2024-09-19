import { getSession } from 'next-auth/react';
import prisma from '../../lib/prisma';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const session = await getSession({ req });
    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { subscriptionStatus: true, subscriptionExpiryDate: true },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const currentDate = new Date();
    const isFreeTrial = user.subscriptionStatus === 'inactive' && 
                        user.subscriptionExpiryDate && 
                        currentDate < new Date(user.subscriptionExpiryDate);
    const isExpired = currentDate > new Date(user.subscriptionExpiryDate);
    const expiresIn = getDaysBetweenDates(new Date(), new Date(user.subscriptionExpiryDate))

    const isSubscribed = user.subscriptionStatus === 'active' &&
                        currentDate < new Date(user.subscriptionExpiryDate);

    if(isFreeTrial) {
      res.status(200).json({ status: "Free Trial", expiresIn: 'Expires in ' + expiresIn + " Days"});
    } else if(isExpired) {
      res.status(200).json({ status: "Expired", expiresIn: "" })
    } else if(isSubscribed) {
      res.status(200).json({ status: "Subscribed", expiresIn: "" })
    }
  } catch (error) {
    console.error('Error checking free trial status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

function getDaysBetweenDates(date1, date2) {
  // Convert both dates to milliseconds
  const date1Ms = date1.getTime();
  const date2Ms = date2.getTime();

  // Calculate the difference in milliseconds
  const differenceMs = Math.abs(date2Ms - date1Ms);

  // Convert the difference to days
  return Math.floor(differenceMs / (1000 * 60 * 60 * 24));
}
