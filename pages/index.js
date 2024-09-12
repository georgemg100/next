import Layout from '../components/Layout';
import LoginButtons from '../components/LoginButtons';
import { useSession } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our Authentication App</h1>
        <p className="mb-4">
          Experience the power of seamless authentication and robust security.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Easy Integration</h2>
            <p>Integrate Google and Facebook login with just a few clicks.</p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-2">Secure & Reliable</h2>
            <p>Your data is protected with industry-standard security measures.</p>
          </div>
        </div>
        <LoginButtons />
      </div>
    </Layout>
  );
}
