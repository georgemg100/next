import React from 'react';
import Link from 'next/link';

const SubscriptionPrompt = ({ isAuthenticated, isSubscribed }) => {
  // If the user is subscribed, don't show any prompt
  if (isSubscribed) {
    return null;
  }

  return (
    <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 my-4 rounded-r shadow-md" role="alert">
      <p className="font-bold text-lg mb-2">
        {isAuthenticated ? 'Upgrade Your Experience' : 'Join Anthill Coder'}
      </p>
      <p className="mb-4">
        {isAuthenticated
          ? 'Unlock all features and take your development to the next level.'
          : 'Sign up now to access powerful development tools and resources.'}
      </p>
      <Link
        href={isAuthenticated ? '/subscription' : '/get-started'}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
      >
        {isAuthenticated ? 'Subscribe Now' : 'Get Started'}
      </Link>
    </div>
  );
};

export default SubscriptionPrompt;
