import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { loadStripe } from '@stripe/stripe-js';

export default function PrivacyPolicy() {
  
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">PrivacyPolicy</h1>
          <div>
          <h1>Privacy Policy</h1>
    <p class="last-updated">Last Updated: February 27, 2025</p>

    <p>This Privacy Policy explains how we collect, use, store, and protect your information when you use our Android accessibility app (the "App"). By using the App, you agree to the collection and use of information in accordance with this policy.</p>

    <h2>Information We Collect</h2>
    <p>We collect the following types of information:</p>
    <ul>
        <li><strong>Account Information:</strong> When you sign up, we collect your email address and authentication data through Firebase Authentication.</li>
        <li><strong>Command History:</strong> We store your command history, including the commands you enter and their execution results.</li>
        <li><strong>Device Information:</strong> We may collect device-specific information such as device model, operating system version, and unique device identifiers.</li>
        <li><strong>Usage Data:</strong> We collect information about how you use the App, including interaction patterns and feature usage.</li>
    </ul>

    <h2>How We Use Your Information</h2>
    <p>We use the collected information for various purposes:</p>
    <ul>
        <li>To provide and maintain the App's functionality</li>
        <li>To personalize your experience within the App</li>
        <li>To improve the App based on how users interact with it</li>
        <li>To communicate with you, including sending updates and notifications</li>
        <li>To authenticate your identity and secure your account</li>
        <li>To comply with legal obligations</li>
    </ul>

    <h2>Data Storage and Security</h2>
    <p>We use Firebase, a service provided by Google, to store authentication data and other app-related information. Your command history is stored locally on your device and may also be backed up to your authenticated account.</p>
    
    <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>

    <h2>Data Sharing and Disclosure</h2>
    <p>We do not sell your personal information to third parties. We may share your information in the following circumstances:</p>
    <ul>
        <li>With service providers who perform services on our behalf (like Firebase)</li>
        <li>If required by law or to respond to legal processes</li>
        <li>To protect our rights, privacy, safety or property, and that of our users or others</li>
        <li>In connection with a merger, acquisition, or sale of assets</li>
    </ul>

    <h2>Your Rights</h2>
    <p>Depending on your location, you may have rights regarding your personal information, including:</p>
    <ul>
        <li>The right to access, update, or delete your information</li>
        <li>The right to restrict or object to processing</li>
        <li>The right to data portability</li>
        <li>The right to withdraw consent</li>
    </ul>
    <p>To exercise these rights, please contact us using the details provided at the end of this policy.</p>

    <h2>Children's Privacy</h2>
    <p>The App is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us so we can take necessary actions.</p>

    <h2>Changes to This Privacy Policy</h2>
    <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.</p>

    <h2>Contact Us</h2>
    <p>If you have any questions about this Privacy Policy or for account deletions, please contact us at:</p>
    <p>Email: mobileuseemail100@gmail.com</p>
        
    </div>
        
      </div>
    </Layout>
  );
}
