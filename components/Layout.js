import Head from 'next/head';

/**
 * Layout Component
 * 
 * This component provides a consistent layout structure for pages.
 * It includes the Head component for managing page metadata and applies
 * styling classes from the new Next.js template.
 */
const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>NextJS Auth App</title>
        <meta name="description" content="NextJS app with authentication" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </main>
      <footer className="bg-gray-100 py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600">© 2024 NextJS Auth App</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
