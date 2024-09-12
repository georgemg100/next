import { SessionProvider } from 'next-auth/react';
import Navbar from '../components/Navbar';
import '../styles/globals.css';

// Custom App component to wrap the entire application
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Navbar />
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
