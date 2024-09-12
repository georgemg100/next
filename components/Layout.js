import Head from 'next/head';

/**
 * Layout Component
 * 
 * This component provides a consistent layout structure for pages.
 * It includes the Head component for managing page metadata.
 */
const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>NextJS Auth App</title>
        <meta name="description" content="NextJS app with authentication" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>{children}</main>
      <footer style={{ textAlign: 'center', padding: '20px' }}>
        <p>© 2024 NextJS Auth App</p>
      </footer>
    </>
  );
};

export default Layout;
