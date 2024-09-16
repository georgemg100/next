import { useSession } from 'next-auth/react';
import Layout from '../components/Layout';

export default function Profile() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (!session) {
    return <p>Access Denied</p>;
  }

  return (
    <Layout>
      <h1>Profile</h1>
      <p>Name: {session.user.name}</p>
      <p>Email: {session.user.email}</p>
      {session.user.licenseKey && (
            <p>License Key: {session.user.licenseKey}</p>
          )}
      <div>
        <h2>Subscription Status</h2>
        {session.user.subscriptionStatus === 'active' ? (
          <p className="text-green-600 font-bold">Active</p>
        ) : (
          <p className="text-red-600 font-bold">Inactive</p>
        )}
        {session.user.subscriptionExpiryDate && (
          <p>Expires on: {new Date(session.user.subscriptionExpiryDate).toLocaleDateString()}</p>
        )}
      </div>
    </Layout>
  );
}
