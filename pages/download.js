import Head from 'next/head';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Download() {
  const [isAndroid, setIsAndroid] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showDownloadStarted, setShowDownloadStarted] = useState(false);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // Detect device
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    setIsAndroid(/android/i.test(userAgent));
    setIsIOS(/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream);
    
    // Auto-start download after a short delay on Android
    if (/android/i.test(userAgent)) {
      const timer = setTimeout(() => {
        handleDownloadClick();
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    // Countdown timer for automatic download
    if (showDownloadStarted && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [showDownloadStarted, countdown]);

  const handleDownloadClick = () => {
    // Start the download
    window.location.href = '/download/mobileuse.apk';
    // Show download started message
    setShowDownloadStarted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#2C3E50]">
      <Head>
        <title>Download MobileUse - Android Assistant</title>
        <meta name="description" content="Download MobileUse - the AI-powered autonomous assistant for Android" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-[#2C3E50] text-white py-4 px-4 shadow-md">
        <div className="max-w-screen-md mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">MobileUse</h1>
          <Link href="/" className="text-sm text-white/80 hover:text-white">
            Home
          </Link>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center px-4 py-10">
        <div className="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="bg-[#FF9800] px-6 py-8 text-center">
            <div className="text-white mb-4 text-5xl">📱</div>
            <h1 className="text-2xl font-bold text-white mb-2">Download MobileUse</h1>
            <p className="text-white/90">Android AI Assistant</p>
          </div>

          <div className="p-6">
            {isAndroid ? (
              <>
                {!showDownloadStarted ? (
                  <div className="text-center mb-6">
                    <p className="text-gray-700 mb-6">Your download should start automatically in a few seconds...</p>
                    <button 
                      onClick={handleDownloadClick}
                      className="bg-[#FF9800] text-white py-3 px-8 rounded-md font-medium w-full shadow-md hover:bg-opacity-90 transition duration-300 flex items-center justify-center"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                      </svg>
                      Download Now
                    </button>
                  </div>
                ) : (
                  <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-green-800">Download started</h3>
                        <div className="mt-2 text-sm text-green-700">
                          <p>Your download should begin automatically. If it doesn't start in {countdown} seconds, tap the button below.</p>
                        </div>
                        <div className="mt-4">
                          <button
                            onClick={handleDownloadClick}
                            className="bg-green-100 px-2 py-1.5 rounded-md text-sm font-medium text-green-800 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                          >
                            Download Again
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-4 text-gray-600">
                  <h3 className="font-medium text-[#2C3E50]">Installation Instructions:</h3>
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>When prompted, tap <strong>Download</strong> to save the APK file.</li>
                    <li>Open your <strong>Downloads</strong> folder or tap the downloaded file.</li>
                    <li>Tap <strong>Install</strong> when prompted.</li>
                    <li>If warned about an unknown source, tap <strong>Settings</strong> and enable "Install unknown apps" for your browser.</li>
                    <li>Return to the installation and tap <strong>Install</strong> again.</li>
                    <li>Once installed, open MobileUse and follow the on-screen setup instructions.</li>
                  </ol>
                </div>
              </>
            ) : isIOS ? (
              <div className="text-center py-4">
                <div className="text-6xl mb-4">😔</div>
                <h3 className="text-xl font-medium text-gray-800 mb-4">Sorry, iOS Not Supported</h3>
                <p className="text-gray-600 mb-6">
                  MobileUse is currently only available for Android devices. We're working on iOS support for the future.
                </p>
                <Link href="/" className="text-[#FF9800] hover:text-[#2C3E50] font-medium">
                  Return to Homepage
                </Link>
              </div>
            ) : (
              <div className="text-center py-4">
                <button 
                  onClick={handleDownloadClick}
                  className="bg-[#FF9800] text-white py-3 px-8 rounded-md font-medium mb-6 w-full shadow-md hover:bg-opacity-90 transition duration-300 flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                  </svg>
                  Download for Android
                </button>
                <p className="text-gray-600 text-sm">
                  This download is for Android devices only. If you're on a desktop, please scan the QR code on our homepage with your Android device.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Features section */}
        <div className="mt-12 w-full max-w-md">
          <h2 className="text-xl font-bold text-white mb-6 text-center">App Features</h2>
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white">
              <div className="flex items-start">
                <div className="text-[#FF9800] text-2xl mr-3">🚀</div>
                <div>
                  <h3 className="font-medium mb-1">AI-Powered Automation</h3>
                  <p className="text-sm text-white/80">Advanced reasoning with 1024 tokens for intelligent decision making</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white">
              <div className="flex items-start">
                <div className="text-[#FF9800] text-2xl mr-3">📱</div>
                <div>
                  <h3 className="font-medium mb-1">Complete Device Control</h3>
                  <p className="text-sm text-white/80">Executes tasks across apps with accessibility services</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white">
              <div className="flex items-start">
                <div className="text-[#FF9800] text-2xl mr-3">⚡</div>
                <div>
                  <h3 className="font-medium mb-1">Boost Productivity</h3>
                  <p className="text-sm text-white/80">Automate repetitive tasks and optimize your workflow</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-[#263545] text-white py-6 px-4">
        <div className="max-w-screen-md mx-auto text-center">
          <div className="mb-4 flex justify-center space-x-6">
            <Link href="/" className="text-white/70 hover:text-[#FF9800] transition duration-300">
              Home
            </Link>
            <Link href="/privacy_policy" className="text-white/70 hover:text-[#FF9800] transition duration-300">
              Privacy Policy
            </Link>
            <Link href="/learn-more" className="text-white/70 hover:text-[#FF9800] transition duration-300">
              Features
            </Link>
          </div>
          <p className="text-white/60 text-sm">© 2025 MobileUse. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}