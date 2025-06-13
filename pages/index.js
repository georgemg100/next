import Head from 'next/head';
import Layout from '../components/Layout';
import LoginButtons from '../components/LoginButtons';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  const { data: session, status } = useSession();
  const loading = status === 'loading';
  const [isMobile, setIsMobile] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  
  useEffect(() => {
    // Simple device detection
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    setIsMobile(/android|iphone|ipad|ipod|blackberry|windows phone/i.test(userAgent));
  }, []);

  return (
    <Layout>
      <Head>
        <title>MobileUse - Autonomous Android Assistant</title>
        <meta name="description" content="MobileUse - AI-powered autonomous assistant for Android that boosts your social media engagement and SEO with advanced reasoning capabilities." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {!session && (
        <div className="hero-section bg-[#2C3E50] text-white py-24">
          <div className="hero-content max-w-5xl mx-auto text-center px-4">
            <h1 className="hero-title text-5xl md:text-6xl font-bold mb-6">Welcome to MobileUse</h1>
            <p className="hero-subtitle text-xl md:text-2xl mb-8">The Autonomous AI Assistant for Your Android Device</p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
              {isMobile ? (
                <a href="/download" className="flex items-center justify-center bg-[#FF9800] text-white hover:bg-opacity-90 px-8 py-3 rounded-md font-medium text-lg shadow-lg transition duration-300">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                  </svg>
                  Download App
                </a>
              ) : (
                <button 
                  onClick={() => setShowQRModal(true)} 
                  className="flex items-center justify-center bg-[#FF9800] text-white hover:bg-opacity-90 px-8 py-3 rounded-md font-medium text-lg shadow-lg transition duration-300"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                  </svg>
                  Get Mobile App
                </button>
              )}
              {/* <a href="/learn-more" className="flex items-center justify-center border-2 border-white text-white hover:bg-white hover:text-[#2C3E50] px-8 py-3 rounded-md font-medium text-lg transition duration-300">
                Learn More
              </a> */}
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-[#2C3E50]">Why Choose MobileUse?</h2>
          <div className="w-20 h-1 bg-[#FF9800] mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the future of mobile automation with our advanced AI assistant.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-[#FF9800]">
            <div className="text-[#2C3E50] text-5xl mb-4">🚀</div>
            <h3 className="text-2xl font-bold mb-4 text-[#2C3E50]">Powerful Automation</h3>
            <p className="text-gray-600">Advanced AI reasoning with 1024 tokens budgeted for thinking before every action.</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-[#FF9800]">
            <div className="text-[#2C3E50] text-5xl mb-4">📈</div>
            <h3 className="text-2xl font-bold mb-4 text-[#2C3E50]">Boost Engagement</h3>
            <p className="text-gray-600">Optimize your social media presence and SEO with intelligent automation.</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-[#FF9800]">
            <div className="text-[#2C3E50] text-5xl mb-4">⏱️</div>
            <h3 className="text-2xl font-bold mb-4 text-[#2C3E50]">Save Time</h3>
            <p className="text-gray-600">Let MobileUse handle repetitive tasks while you focus on what matters most.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-[#2C3E50]">Revolutionize Your Mobile Experience</h2>
            <div className="w-16 h-1 bg-[#FF9800] mb-8"></div>
            <p className="text-lg text-gray-600 mb-4">
              MobileUse is an advanced autonomous AI agent that takes control of your Android device to execute tasks on your behalf. Using accessibility services and cutting-edge AI reasoning, MobileUse delivers unparalleled automation.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              Whether you're managing social media accounts, optimizing for SEO, or handling repetitive tasks, MobileUse works intelligently to boost your productivity and digital presence.
            </p>
            {/* <button className="bg-[#FF9800] text-white hover:bg-opacity-90 px-6 py-2 rounded-md font-medium shadow-md transition duration-300">
              Learn More
            </button> */}
          </div>
          <div className="rounded-xl overflow-hidden shadow-xl">
            <iframe 
              width="100%" 
              height="315"
              src="http://youtube.com/watch?v=_hdaFQLeOVw" 
              title="MobileUse Demo"
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen>
            </iframe>
          </div>
        </div>
        
        <div className="bg-[#2C3E50] text-white p-12 rounded-lg shadow-xl my-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Join thousands of users who have transformed their mobile productivity with MobileUse.
            </p>
            {isMobile ? (
              <a href="/download" className="inline-flex items-center bg-[#FF9800] text-white hover:bg-opacity-90 px-8 py-3 rounded-md font-medium text-lg shadow-lg transition duration-300">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                </svg>
                Download App
              </a>
            ) : (
              <button 
                onClick={() => setShowQRModal(true)} 
                className="inline-flex items-center bg-[#FF9800] text-white hover:bg-opacity-90 px-8 py-3 rounded-md font-medium text-lg shadow-lg transition duration-300"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                </svg>
                Get Mobile App
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="text-center mt-8 pb-8">
        <div className="mt-8">
          <a href='/privacy_policy' className="text-[#2C3E50] hover:text-[#FF9800] transition duration-300">Privacy Policy</a>
        </div>
      </div>

      {/* QR Code Modal for Desktop Users */}
      {showQRModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-[#2C3E50]">Download to Your Mobile Device</h3>
              <button 
                onClick={() => setShowQRModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            
            <div className="text-center mb-6">
              <div className="mx-auto w-48 bg-gray-200 mb-4 flex items-center justify-center">
                {/* Sample QR code placeholder - replace with actual QR code */}
                <img
                  src="qr-code-mobileuse.svg"
                  alt="QR Code"
                  className="w-48"
                />
              </div>
              <p className="text-gray-700 mb-2">Scan this QR code with your mobile device to download the MobileUse APK</p>
              <p className="text-sm text-gray-500">Or visit <span className="font-medium">{typeof window !== 'undefined' ? window.location.origin : ''}/download</span> on your mobile device</p>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <div className="flex flex-col space-y-4">
                <h4 className="font-medium text-[#2C3E50]">Alternative Download Options:</h4>
                <div className="flex space-x-4">
                  {/* <a 
                    href="https://play.google.com/store/apps/details?id=com.mobileuse.app" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center bg-green-600 text-white px-4 py-2 rounded-md flex-1 hover:bg-green-700 transition duration-300"
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.609 1.814L13.792 12 3.61 22.186c-.28.28-.659.423-1.033.423-.396 0-.794-.155-1.084-.44-.604-.609-.604-1.596 0-2.2L9.327 12 1.493 4.168c-.604-.609-.604-1.596 0-2.205.604-.609 1.596-.609 2.116 0z M20.372 4.168L12.538 12l7.834 7.832c.604.609.604 1.596 0 2.205-.28.28-.659.423-1.033.423-.396 0-.794-.155-1.084-.44L8.073 12 18.255 1.814c.604-.609 1.596-.609 2.116 0 .604.609.604 1.596 0 2.354z"/>
                    </svg>
                    Play Store
                  </a> */}
                  <a 
                    href="/download" 
                    className="flex items-center justify-center bg-[#FF9800] text-white px-4 py-2 rounded-md flex-1 hover:bg-opacity-90 transition duration-300"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                    </svg>
                    Direct Download
                  </a>
                </div>
                <button 
                  onClick={() => setShowQRModal(false)} 
                  className="text-[#2C3E50] hover:text-[#FF9800] font-medium transition duration-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
