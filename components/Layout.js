import React from 'react';
import Link from 'next/link';

const Layout = ({ children }) => {


  return (
    <div className="flex flex-col min-h-screen">
      {/* <Navbar /> */}
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </main>
      <footer className="footer-modern py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <h3 className="text-3xl font-black mb-6 bg-gradient-to-r from-orange-400 to-white bg-clip-text text-transparent">
                MobileUse
              </h3>
              <p className="text-gray-300 mb-6 text-lg leading-relaxed max-w-md">
                The Autonomous AI Assistant for your Android device that transforms your mobile productivity with advanced reasoning capabilities.
              </p>
              <div className="flex space-x-4">
                <span className="glass px-4 py-2 rounded-full text-sm text-orange-400 border border-orange-400/30">
                  🤖 AI-Powered
                </span>
                <span className="glass px-4 py-2 rounded-full text-sm text-white border border-white/30">
                  🚀 Autonomous
                </span>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-6 text-gray-200">Resources</h3>
              <ul className="space-y-3">
                <li><Link href="/privacy_policy" className="text-gray-400 hover:text-orange-400 transition-colors">Privacy Policy</Link></li>
                <li><Link href="/download" className="text-gray-400 hover:text-orange-400 transition-colors">Download App</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-6 text-gray-200">Contact Developer</h3>
              <div className="space-y-3">
                <p className="text-gray-300 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  mobileuseemail100@gmail.com
                </p>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 mt-12 pt-8 text-center">
            <p className="text-gray-400">© 2025 MobileUse. All rights reserved. Built with cutting-edge AI technology.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
