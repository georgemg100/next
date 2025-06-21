import Head from 'next/head';
import Layout from '../components/Layout';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  const { data: session } = useSession();
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
        <div className="hero-modern">
          <div className="hero-content-modern">
            <h1 className="hero-title-modern">MobileUse</h1>
            <p className="hero-subtitle-modern">The Autonomous AI Assistant for Your Android Device</p>
            <p className="text-lg md:text-xl mb-8 text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Experience the future of mobile automation with advanced AI reasoning
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
              {isMobile ? (
                <Link href="/download" className="btn-gradient group">
                  <svg className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                  </svg>
                  Download App
                </Link>
              ) : (
                <button 
                  onClick={() => setShowQRModal(true)} 
                  className="btn-gradient group"
                >
                  <svg className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                  </svg>
                  Get Mobile App
                </button>
              )}
              {/* <button className="btn-accent group">
                <svg className="w-6 h-6 mr-3 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Watch Demo
              </button> */}
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              <span className="bg-gradient-to-r from-orange-400 via-white to-orange-400 bg-clip-text text-transparent">
                App Features in Action
              </span>
            </h2>
            <div className="w-32 h-2 bg-gradient-to-r from-orange-400 to-orange-600 mx-auto mb-8 rounded-full"></div>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              See how MobileUse transforms your Android device into an intelligent automation powerhouse.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="glass-card group hover:scale-105 transition-transform duration-300">
              <div className="aspect-[9/16] bg-gradient-to-br from-orange-900/20 to-blue-900/20 rounded-xl mb-6 flex items-center justify-center overflow-hidden">
                {/* TODO: Replace with actual app screenshot 
                    Store image at: /public/images/screenshots/main-interface.png
                    Then use: <img src="/images/screenshots/main-interface.png" alt="MobileUse Main Interface" className="w-full h-full object-cover rounded-xl" />
                */}
                <img src="/images/screenshots/screen_shot_ai_prompt.png" alt="MobileUse Main Interface" className="w-full h-full object-cover rounded-xl" />
                <div className="text-center p-6">
                  {/* <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                    </svg>
                  </div> */}
                  {/* <p className="text-gray-400 text-sm">App Screenshot Placeholder</p>
                  <p className="text-xs text-gray-500 mt-2">Main Interface</p> */}
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Ask AI to Do Anything</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Simply tell MobileUse what you want accomplished and watch as AI takes control of your device to complete complex tasks automatically.
              </p>
            </div>

            <div className="glass-card group hover:scale-105 transition-transform duration-300">
              <div className="aspect-[9/16] bg-gradient-to-br from-blue-900/20 to-orange-900/20 rounded-xl mb-6 flex items-center justify-center overflow-hidden">
                {/* TODO: Replace with actual app screenshot 
                    Store image at: /public/images/screenshots/ai-reasoning.png
                    Then use: <img src="/images/screenshots/ai-reasoning.png" alt="MobileUse AI Reasoning Engine" className="w-full h-full object-cover rounded-xl" />
                */}
                <img src="/images/screenshots/screen_shot_action_history.png" alt="MobileUse Main Interface" className="w-full h-full object-cover rounded-xl" />
                <div className="text-center p-6">
                  {/* <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                    </svg>
                  </div>
                  <p className="text-gray-400 text-sm">App Screenshot Placeholder</p>
                  <p className="text-xs text-gray-500 mt-2">AI Reasoning</p> */}
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Track Every Action</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                See exactly what the AI did to complete your task with detailed action history and transparent reasoning at every step.
              </p>
            </div>

            <div className="glass-card group hover:scale-105 transition-transform duration-300">
              <div className="aspect-[9/16] bg-gradient-to-br from-green-900/20 to-orange-900/20 rounded-xl mb-6 flex items-center justify-center overflow-hidden">
                {/* TODO: Replace with actual app screenshot 
                    Store image at: /public/images/screenshots/task-automation.png
                    Then use: <img src="/images/screenshots/task-automation.png" alt="MobileUse Task Automation" className="w-full h-full object-cover rounded-xl" />
                */}
                <img src="/images/screenshots/screen_shot_edit_action_sequence.png" alt="MobileUse Main Interface" className="w-full h-full object-cover rounded-xl" />
                <div className="text-center p-6">
                  {/* <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                  </div>
                  <p className="text-gray-400 text-sm">App Screenshot Placeholder</p>
                  <p className="text-xs text-gray-500 mt-2">Task Automation</p> */}
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Perfect Your Workflows</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Edit, customize, and fine-tune action sequences to create the perfect automation that works exactly how you need it.
              </p>
            </div>

            <div className="glass-card group hover:scale-105 transition-transform duration-300">
              <div className="aspect-[9/16] bg-gradient-to-br from-purple-900/20 to-orange-900/20 rounded-xl mb-6 flex items-center justify-center overflow-hidden">
                {/* TODO: Replace with actual app screenshot 
                    Store image at: /public/images/screenshots/analytics-dashboard.png
                    Then use: <img src="/images/screenshots/analytics-dashboard.png" alt="MobileUse Analytics Dashboard" className="w-full h-full object-cover rounded-xl" />
                */}
                <img src="/images/screenshots/screen_shot_choose_automation.png" alt="MobileUse Main Interface" className="w-full h-full object-cover rounded-xl" />
                <div className="text-center p-6">
                  {/* <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                    </svg>
                  </div>
                  <p className="text-gray-400 text-sm">App Screenshot Placeholder</p>
                  <p className="text-xs text-gray-500 mt-2">Analytics Dashboard</p> */}
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Choose Your Automation</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Select from pre-built automations or create custom workflows tailored to your specific needs and preferences.
              </p>
            </div>

            <div className="glass-card group hover:scale-105 transition-transform duration-300">
              <div className="aspect-[9/16] bg-gradient-to-br from-red-900/20 to-orange-900/20 rounded-xl mb-6 flex items-center justify-center overflow-hidden">
                {/* TODO: Replace with actual app screenshot 
                    Store image at: /public/images/screenshots/security-settings.png
                    Then use: <img src="/images/screenshots/security-settings.png" alt="MobileUse Security Settings" className="w-full h-full object-cover rounded-xl" />
                */}
                <img src="/images/screenshots/screenshot_loop_actions.png" alt="MobileUse Main Interface" className="w-full h-full object-cover rounded-xl" />
                <div className="text-center p-6">
                  {/* <div className="w-20 h-20 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                    </svg>
                  </div>
                  <p className="text-gray-400 text-sm">App Screenshot Placeholder</p>
                  <p className="text-xs text-gray-500 mt-2">Security Settings</p> */}
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Set It and Forget It</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Loop actions continuously for repetitive tasks - post to social media, check emails, or handle routine work while you sleep.
              </p>
            </div>

            <div className="glass-card group hover:scale-105 transition-transform duration-300">
              <div className="aspect-[9/16] bg-gradient-to-br from-yellow-900/20 to-orange-900/20 rounded-xl mb-6 flex items-center justify-center overflow-hidden">
                {/* TODO: Replace with actual app screenshot 
                    Store image at: /public/images/screenshots/custom-workflows.png
                    Then use: <img src="/images/screenshots/custom-workflows.png" alt="MobileUse Custom Workflows" className="w-full h-full object-cover rounded-xl" />
                */}
                <img src="/images/screenshots/screen_shot_add_custom_tasks.png" alt="MobileUse Main Interface" className="w-full h-full object-cover rounded-xl" />
                <div className="text-center p-6">
                  {/* <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                  </div>
                  <p className="text-gray-400 text-sm">App Screenshot Placeholder</p>
                  <p className="text-xs text-gray-500 mt-2">Customization</p> */}
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Smart Dynamic Actions</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Add AI-guided tasks that adapt to changing conditions, making your automations intelligent enough to handle unexpected scenarios.
              </p>
            </div>
          </div>
        </div>

        {/* <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            <span className="bg-gradient-to-r from-orange-400 via-white to-orange-400 bg-clip-text text-transparent">
              Why Choose MobileUse?
            </span>
          </h2>
          <div className="w-32 h-2 bg-gradient-to-r from-orange-400 to-orange-600 mx-auto mb-8 rounded-full"></div>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Experience the future of mobile automation with our advanced AI assistant powered by cutting-edge reasoning capabilities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          <div className="feature-card-modern">
            <div className="feature-icon-modern">🤖</div>
            <h3 className="feature-title-modern">AI Reasoning Engine</h3>
            <p className="text-gray-300 text-lg leading-relaxed">Advanced AI reasoning with 1024 tokens budgeted for thinking before every action, ensuring intelligent decision-making.</p>
          </div>
          <div className="feature-card-modern">
            <div className="feature-icon-modern">⚡</div>
            <h3 className="feature-title-modern">Lightning Fast Automation</h3>
            <p className="text-gray-300 text-lg leading-relaxed">Optimize your social media presence and SEO with intelligent automation that works 24/7.</p>
          </div>
          <div className="feature-card-modern">
            <div className="feature-icon-modern">🎯</div>
            <h3 className="feature-title-modern">Precision Control</h3>
            <p className="text-gray-300 text-lg leading-relaxed">Let MobileUse handle repetitive tasks with surgical precision while you focus on what matters most.</p>
          </div>
        </div> */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <div className="order-2 lg:order-1">
            <h2 className="text-4xl md:text-5xl font-black mb-8">
              <span className="bg-gradient-to-r from-orange-400 to-white bg-clip-text text-transparent">
                Revolutionize Your Mobile Experience
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-orange-600 mb-8 rounded-full"></div>
            <p className="text-lg md:text-xl text-gray-300 mb-6 leading-relaxed">
              MobileUse is an advanced autonomous AI agent that takes control of your Android device to execute tasks on your behalf. Using accessibility services and cutting-edge AI reasoning, MobileUse delivers unparalleled automation.
            </p>
            <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
              Whether you're managing social media accounts, optimizing for SEO, or handling repetitive tasks, MobileUse works intelligently to boost your productivity and digital presence.
            </p>
            <div className="flex flex-wrap gap-4">
              <span className="glass px-4 py-2 rounded-full text-sm text-orange-400 border border-orange-400/30">
                🧠 AI-Powered
              </span>
              <span className="glass px-4 py-2 rounded-full text-sm text-white border border-white/30">
                🚀 Autonomous
              </span>
              <span className="glass px-4 py-2 rounded-full text-sm text-orange-300 border border-orange-300/30">
                ⚡ Real-time
              </span>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="glass-card pulse-glow rounded-3xl overflow-hidden">
              <iframe 
                width="100%" 
                height="400"
                src="https://www.youtube.com/embed/_hdaFQLeOVw" 
                title="MobileUse Demo"
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="rounded-2xl">
              </iframe>
            </div>
          </div>
        </div>
        
        <div className="glass-card text-center mb-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 via-blue-900/20 to-orange-600/20 opacity-50"></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              <span className="bg-gradient-to-r from-orange-400 via-white to-orange-400 bg-clip-text text-transparent">
                Ready to Get Started?
              </span>
            </h2>
            <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto text-gray-300 leading-relaxed">
              Join thousands of users who have transformed their mobile productivity with MobileUse's advanced AI automation.
            </p>
            {isMobile ? (
              <Link href="/download" className="btn-gradient group mr-4">
                <svg className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                </svg>
                Download App
              </Link>
            ) : (
              <button 
                onClick={() => setShowQRModal(true)} 
                className="btn-gradient group mr-4"
              >
                <svg className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                </svg>
                Get Mobile App
              </button>
            )}
            {/* <button className="btn-secondary group">
              <svg className="w-6 h-6 mr-3 group-hover:rotate-45 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
              Try Demo
            </button> */}
          </div>
        </div>
      </div>

      <div className="text-center mt-8 pb-8">
        <div className="mt-8">
          <Link href='/privacy_policy' className="text-gray-400 hover:text-orange-400 transition-colors">Privacy Policy</Link>
        </div>
      </div>

      {/* QR Code Modal for Desktop Users */}
      {showQRModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="glass-card max-w-lg w-full relative">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-600/10 via-blue-900/10 to-orange-600/10 rounded-2xl"></div>
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-white bg-clip-text text-transparent">
                  Download to Your Mobile Device
                </h3>
                <button 
                  onClick={() => setShowQRModal(false)}
                  className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              
              <div className="text-center mb-8">
                <div className="mx-auto w-56 h-56 glass rounded-2xl mb-6 flex items-center justify-center pulse-glow">
                  <img
                    src="qr-code-mobileuse.svg"
                    alt="QR Code"
                    className="w-48 h-48 rounded-xl"
                  />
                </div>
                <p className="text-gray-300 mb-4 text-lg">Scan this QR code with your mobile device to download the MobileUse APK</p>
                <p className="text-sm text-gray-400">
                  Or visit <span className="font-medium text-orange-400">{typeof window !== 'undefined' ? window.location.origin : ''}/download</span> on your mobile device
                </p>
              </div>
              
              <div className="border-t border-white/10 pt-8">
                <div className="flex flex-col space-y-6">
                  <h4 className="font-semibold text-xl text-gray-200">Alternative Download Options:</h4>
                  <div className="flex space-x-4">
                    <Link 
                      href="/download" 
                      className="btn-accent flex-1 justify-center"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                      </svg>
                      Direct Download
                    </Link>
                  </div>
                  <button 
                    onClick={() => setShowQRModal(false)} 
                    className="text-gray-400 hover:text-orange-400 font-medium transition-colors self-center"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
