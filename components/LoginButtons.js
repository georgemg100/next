import { signIn, useSession } from 'next-auth/react';

/**
 * LoginButtons Component
 * 
 * This component renders sign-in buttons for different providers.
 * It's styled to match the new Next.js template design.
 */
const LoginButtons = () => {
  const { data: session } = useSession();

  if (session) {
    return null; // Don't show login buttons for authenticated users
  }

  return (
    <div className="space-y-4">
      <button 
        onClick={() => signIn('google')}
        className="w-full bg-white text-gray-700 font-semibold py-2 px-4 border border-gray-300 rounded shadow hover:bg-gray-50 transition duration-150 ease-in-out"
      >
        Sign in with Google
      </button>
      <button 
        onClick={() => signIn('github')}
        className="w-full bg-gray-800 text-white font-semibold py-2 px-4 border border-gray-800 rounded shadow hover:bg-gray-700 transition duration-150 ease-in-out"
      >
        Sign in with GitHub
      </button>
      {/* Keep existing email sign-in button with updated styling */}
      {/* <button 
        onClick={() => signIn('email')}
        className="w-full bg-blue-500 text-white font-semibold py-2 px-4 border border-blue-500 rounded shadow hover:bg-blue-600 transition duration-150 ease-in-out"
      >
        Sign in with Email
      </button> */}
    </div>
  );
};

export default LoginButtons;
