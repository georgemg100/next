import { useState } from 'react';
import { signIn } from 'next-auth/react';

// Error message component
const ErrorMessage = ({ message }) => (
  <div className="text-red-500 text-sm mt-2">{message}</div>
);

const LoginButtons = () => {
  const [error, setError] = useState(null);

  const handleSignIn = async (provider) => {
    try {
      const result = await signIn(provider, { callbackUrl: '/profile' });
      if (result?.error) {
        setError(result.error);
      }
    } catch (err) {
      console.error('Sign in error:', err);
      setError('An unexpected error occurred');
    }
  };

  return (
    <div className="space-y-4">
      <button
        onClick={() => handleSignIn('google')}
        className="w-full bg-white text-gray-700 font-semibold py-2 px-4 border border-gray-300 rounded shadow hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Sign in with Google
      </button>
      <button
        onClick={() => handleSignIn('facebook')}
        className="w-full bg-blue-600 text-white font-semibold py-2 px-4 border border-blue-700 rounded shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Sign in with Facebook
      </button>
      {error && <ErrorMessage message={error === 'invalid_client' ? 'Invalid client configuration. Please contact support.' : error} />}
    </div>
  );
};

export default LoginButtons;
