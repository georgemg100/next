import Layout from '../components/Layout';

const GetStarted = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Get Started with MobileUse</h1>
        <div className="prose max-w-none">
          <h2 className="text-2xl font-semibold mb-4">Welcome to MobileUse!</h2>
          <p className="mb-4">
            Follow these steps to get started with our powerful coding assistant:
          </p>
          <ol className="list-decimal list-inside mb-6">
            <li className="mb-2">Sign up for an account or log in if you already have one.</li>
            <li className="mb-2">Choose a subscription plan that fits your needs.</li>
            <li className="mb-2">Download the MobileUse extension for your preferred IDE.</li>
            <li className="mb-2">Install the extension and authenticate with your account.</li>
            <li className="mb-2">Start coding and experience the power of AI-assisted development!</li>
          </ol>
          <h3 className="text-xl font-semibold mb-3">Need Help?</h3>
          <p className="mb-4">
            If you encounter any issues or have questions, please don't hesitate to reach out to our support team. We're here to ensure you have a smooth experience with MobileUse.
          </p>
          {/* <a href="/learn-more" className="text-blue-600 hover:text-blue-800 transition duration-300">
            Learn more about MobileUse's features
          </a> */}
        </div>
      </div>
    </Layout>
  );
};

export default GetStarted;
