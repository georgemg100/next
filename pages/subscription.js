import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { loadStripe } from '@stripe/stripe-js';
import { useRouter } from 'next/router';

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function Subscription() {
  const { data: session, update: updateSession } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const [message, setMessage] = useState(null);

  // Add this useEffect to log the message state
  useEffect(() => {
    console.log('Message updated:', message);
  }, [message]);

  const handleSubscribe = async (endpoint) => {
    if (!session) {
      setError('You must be logged in to subscribe.');
      return;
    }

    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const response = await fetch('/api/' + endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: session.user.id,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }
      
      if(endpoint === 'subscription') {
        const { sessionId } = await response.json();
        const stripe = await stripePromise;
        console.log('sessionId: ' + JSON.stringify(sessionId))
        const { error } = await stripe.redirectToCheckout({ sessionId });
        if (error) {
          throw error;
        }
      } else if(endpoint === 'unsubscribe') {
        const { message } = await response.json();
        console.log('message: ' + message)
        setMessage(message);
        // Update the session to reflect the changes
        await updateSession();
        
        router.push('/cancellation-confirmation');

      }

      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!session) {
    return <p>Please log in to access subscription options.</p>;
  }

  return (
    <div>
      <h1>Subscription Page</h1>
      {session.user.subscriptionStatus === 'active' ? (
        <div>
          <p className="text-green-600 font-bold">Active</p>
          <button onClick={() => handleSubscribe('unsubscribe')}>
            Unsubscribe
          </button>
        </div>
      ) : (
        <div>
          <button onClick={() => handleSubscribe('subscription')} disabled={loading}>
            {loading ? 'Processing...' : 'Subscribe Now'}
          </button>
        </div>
      )}
      {message && <p>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}