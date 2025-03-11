import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { useSession } from 'next-auth/react';

const Layout = ({ children }) => {
  const { data: session, status } = useSession();
  const [showBanner, setShowBanner] = useState(false);
  const [bannerMessage, setBannerMessage] = useState('');
  const [bannerAction, setBannerAction] = useState('');

  useEffect(() => {
    if (status === 'loading') return;

    if (!session) {
      setShowBanner(false);
      //setBannerMessage('Sign up to access all features!');
      //setBannerAction('Sign Up');
    } else if (session && !session.user.isSubscribed) {
      setShowBanner(false);
      //setBannerMessage('Upgrade to premium for full access!');
      //setBannerAction('Subscribe');
    } else {
      setShowBanner(false);
    }
  }, [session, status]);

  const handleBannerAction = () => {
    if (!session) {
      // Redirect to sign up page
      window.location.href = '/api/auth/signin';
    } else {
      // Redirect to subscription page
      window.location.href = '/subscription';
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {showBanner && (
        <div className="bg-blue-500 text-white py-2 px-4 text-center">
          <span>{bannerMessage}</span>
          <button
            onClick={handleBannerAction}
            className="ml-4 bg-white text-blue-500 px-2 py-1 rounded-md text-sm font-medium hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {bannerAction}
          </button>
        </div>
      )}
      {/* <Navbar /> */}
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          © 2025 MobileUse. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
