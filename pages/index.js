import Head from 'next/head';
import Layout from '../components/Layout';
import LoginButtons from '../components/LoginButtons';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function Home() {
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  return (
    <Layout>
      <Head>
        <title>MobileUse - Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {!session && (
        <div className="hero-section bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-20">
          <div className="hero-content max-w-4xl mx-auto text-center px-4">
            <h1 className="hero-title text-4xl md:text-5xl font-bold mb-6">Welcome to MobileUse</h1>
            <p className="hero-subtitle text-xl md:text-2xl mb-8">Coming to Android Soon</p>
          </div>
        </div>
      )}

      <div className="text-center mt-8">
        {loading ? (
          <div>Loading...</div>
        ) : session ? (
          <div>
            <p className="mb-4">Welcome, {session.user.email}!</p>
            {/* <Link href="/profile" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              View Profile
            </Link> */}
          </div>
        ) : (
          <div>
            {/* <p className="mb-4">Please sign in to access your account.</p> */}
            {/* <LoginButtons /> */}
          </div>
        )}
        <a href='/privacy_policy'>privacy policy</a>
      </div>

      {/* {!session && (
        <div className="feature-section py-16 bg-gray-50">
          <div className="feature-grid max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
            <div className="feature-card bg-white p-6 rounded-lg shadow-md">
              <div className="feature-icon text-3xl text-blue-500 mb-4">🚀</div>
              <h3 className="feature-title text-xl font-semibold mb-2">Boost Productivity</h3>
              <p className="feature-description text-gray-600">Access powerful tools to streamline your development process.</p>
            </div>
            <div className="feature-card bg-white p-6 rounded-lg shadow-md">
              <div className="feature-icon text-3xl text-blue-500 mb-4">🌐</div>
              <h3 className="feature-title text-xl font-semibold mb-2">Stay Connected</h3>
              <p className="feature-description text-gray-600">Join a community of passionate developers and share knowledge.</p>
            </div>
            <div className="feature-card bg-white p-6 rounded-lg shadow-md">
              <div className="feature-icon text-3xl text-blue-500 mb-4">📚</div>
              <h3 className="feature-title text-xl font-semibold mb-2">Continuous Learning</h3>
              <p className="feature-description text-gray-600">Access a wealth of resources to keep your skills sharp.</p>
            </div>
          </div>
        </div>
      )} */}
    </Layout>
  );
}
