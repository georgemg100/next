import React from 'react';
import Layout from '../components/Layout';

const LearnMore = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-8">Learn More About Anthill-Coder</h1>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">🤖🔍 Your AI-powered agentic developers</h2>
          <p className="text-lg mb-4">Anthill analyzes, creates, and modifies large codebases.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">🚀 Join the Anthill Community</h2>
          <p className="text-lg mb-4">Connect with like-minded individuals and get the most out of Anthill.</p>
          <ul className="list-disc list-inside space-y-2">
            <li>💡 Get support: Ask questions, troubleshoot issues, and find solutions.</li>
            <li>🗣️ Share knowledge: Share your experiences, tips, and best practices.</li>
            <li>🤝 Network: Connect with other professionals and explore new opportunities.</li>
            <li>🔔 Stay updated: Get the latest news and updates on AIHawk.</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Features</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Starting Objectives: Tell Anthill what you would like to build</li>
            <li>New Objectives: Tell Anthill what you would like to modify in your project</li>
            <li>Constraints: Set limits on what each agent can do</li>
            <li>Tracking changes: Anthill tracks manual changes and considers them in iterations</li>
            <li>Feedback: Anthill provides realtime feedback on its progress in natural language</li>
            <li>Inference Optimization: Anthill optimizes inference per token by breaking tasks into smaller chunks</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Get Started</h2>
          <p className="text-lg">Ready to experience the power of Anthill-Coder? Sign up now and revolutionize your software development process!</p>
          <a href="#" className="inline-block mt-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300">Sign Up</a>
        </section>
      </div>
    </Layout>
  );
};

export default LearnMore;
