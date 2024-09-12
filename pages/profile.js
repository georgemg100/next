import { useSession } from 'next-auth/react';
import Layout from '../components/Layout';

export default function Profile() {
  const { data: session } = useSession();
  console.log('Profile session data:', session);

  return (
    <Layout>
      <h1>Profile</h1>
      {session ? (
        <div>
          <p>Welcome, {session.user.name}</p>
          <p>Email: {session.user.email}</p>
          {session.user.licenseKey && (
            <p>License Key: {session.user.licenseKey}</p>
          )}
        </div>
      ) : (
        <p>Please sign in to view your profile.</p>
      )}
    </Layout>
  );
}
