import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { loadStripe } from '@stripe/stripe-js';

export default function Subscription() {
  const { data: session, update: updateSession } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);
  const [message, setMessage] = useState(null);
  //console.log(session)
  // useEffect(() => {
  //   if (status === 'unauthenticated') {
  //     router.push('/');
  //   } else if (status === 'authenticated') {
  //     fetchSubscriptionStatus();
  //   }
  // }, [status, router]);

  const fetchSubscriptionStatus = async () => {
    try {
      //const response = await fetch('/api/subscription');
      //const data = await response.json();
      //await updateSession()

      //setSubscriptionStatus(data.subscriptionStatus);
    } catch (error) {
      console.error('Error fetching subscription status:', error);
      setError('Failed to fetch subscription status');
    }
  };

  const handleSubscribe = async () => {
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      const response = await fetch('/api/subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const { sessionId } = await response.json();
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
      await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error('Subscription error:', error);
      setError('Failed to initiate subscription. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleUnsubscribe = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/unsubscribe', {
        method: 'POST',
      });
      if (response.ok) {
        //setSubscriptionStatus('inactive');
        const { message } = await response.json();
        console.log('message: ' + message)
        setMessage(message);
        await updateSession();
      } else {
        throw new Error('Failed to unsubscribe');
      }
    } catch (error) {
      console.error('Unsubscribe error:', error);
      setError('Failed to unsubscribe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // if (status === 'loading') {
  //   return <div>Loading...</div>;
  // }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Subscription Management</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {session?.user?.subscriptionStatus === 'active' ? (
          <div>
            <p className="mb-4">Your subscription is currently active. Navigate to your profile page to view your license key</p>
            <button
              onClick={handleUnsubscribe}
              disabled={loading}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Unsubscribe'}
            </button>
          </div>
        ) : (
          <div>
            <p className="mb-4">You are not currently subscribed.</p>
            <button
              onClick={handleSubscribe}
              disabled={loading}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Subscribe Now'}
            </button>
          </div>
        )}
        {message && <p>{message}</p>}
      </div>
    </Layout>
  );
}
