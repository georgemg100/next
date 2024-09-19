import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { ClipboardIcon, ClipboardCheckIcon } from '@heroicons/react/outline';
import axios from 'axios';

export default function Profile() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [licenseKey, setLicenseKey] = useState('');
  const [copied, setCopied] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    } else if (session?.user) {
      // Fetch license key from API or use a placeholder
      fetchSubscriptionStatus();
      setLicenseKey(session.user.licenseKey);
    }
  }, [session, status, router]);

  const fetchSubscriptionStatus = async () => {
    try {
      const response = await axios.get('/api/check-free-trial');
      console.log(response.data.status)
      console.log(response.data.expiresIn)
      setSubscriptionStatus(response.data.status + " " + response.data.expiresIn);
    } catch (error) {
      console.error('Error fetching free trial status:', error);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(licenseKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-6">Profile</h1>
        {session?.user && (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-lg leading-6 font-medium text-gray-900">User Information</h2>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Name</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{session.user.name}</dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Email</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{session.user.email}</dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">License Key</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex items-center">
                    <span className="mr-2">{licenseKey}</span>
                    <button
                      onClick={copyToClipboard}
                      className="text-blue-600 hover:text-blue-800 focus:outline-none"
                      aria-label="Copy license key to clipboard"
                    >
                      {copied ? (
                        <ClipboardCheckIcon className="h-5 w-5" aria-hidden="true" />
                      ) : (
                        <ClipboardIcon className="h-5 w-5" aria-hidden="true" />
                      )}
                    </button>
                    {copied && <span className="ml-2 text-sm text-green-600">Copied!</span>}
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Subscription Status</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{subscriptionStatus}</dd>
                </div>
              </dl>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
