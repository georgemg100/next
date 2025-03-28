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
        <title>MobileUse - Autonomous Android Assistant</title>
        <meta name="description" content="MobileUse - AI-powered autonomous assistant for Android that boosts your social media engagement and SEO with advanced reasoning capabilities." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {!session && (
        <div className="hero-section bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-20">
          <div className="hero-content max-w-4xl mx-auto text-center px-4">
            <h1 className="hero-title text-4xl md:text-5xl font-bold mb-6">Welcome to MobileUse</h1>
            <p className="hero-subtitle text-xl md:text-2xl mb-8">The Autonomous AI Assistant for Your Android Device</p>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Revolutionize Your Mobile Experience</h2>
            <p className="text-lg text-gray-600 mb-4">
              MobileUse is an advanced autonomous AI agent that takes control of your Android device to execute tasks on your behalf. Using accessibility services and cutting-edge AI reasoning with 1024 tokens budgeted for thinking before every action, MobileUse delivers unparalleled automation.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              Whether you're managing social media accounts, optimizing for SEO, or handling repetitive tasks, MobileUse works intelligently to boost your productivity and digital presence.
            </p>
          </div>
          <div className="rounded-xl overflow-hidden shadow-xl">
            <iframe 
              width="100%" 
              height="315"
              src="https://www.youtube.com/embed/Fjht08Anu98" 
              title="MobileUse Demo"
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen>
            </iframe>
          </div>
        </div>
      </div>

      <div className="text-center mt-8 pb-8">
        <div className="mt-8">
          <a href='/privacy_policy' className="text-blue-500 hover:text-blue-700">Privacy Policy</a>
        </div>
      </div>
    </Layout>
  );
}
