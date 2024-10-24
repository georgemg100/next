import { useSession, signIn } from 'next-auth/react';
import { useEffect, useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/router';
import React from 'react';

// Custom hook for navigation-aware effects
function useNavigationAwareEffect(effect, deps) {
  const router = useRouter();
  
  useEffect(() => {
    let isCancelled = false;
    const destructorPromise = effect({ isCancelled });

    const handleRouteChange = () => {
      isCancelled = true;
    };

    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      isCancelled = true;
      router.events.off('routeChangeStart', handleRouteChange);
      if (destructorPromise && typeof destructorPromise.then === 'function') {
        destructorPromise.then(destructor => {
          if (destructor) destructor();
        });
      }
    };
  }, deps);
}

// Error boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div>An error occurred: {this.state.error.message}</div>;
    }

    return this.props.children;
  }
}

// Cancelable promise helper
function makeCancelable(promise) {
  let isCanceled = false;
  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then(
      val => isCanceled ? reject({isCanceled: true}) : resolve(val),
      error => isCanceled ? reject({isCanceled: true}) : reject(error)
    );
  });

  return {
    promise: wrappedPromise,
    cancel() {
      isCanceled = true;
    },
  };
}

export default function CLIAuth() {
  const { data: session, status } = useSession();
  const [authState, setAuthState] = useState('initial');
  const [error, setError] = useState(null);
  const cancelablePromiseRef = useRef(null);

  const fetchToken = useCallback(async () => {
    try {
      const response = await fetch('/api/auth/cli-browser-auth');
      if (!response.ok) throw new Error('Failed to fetch token');
      const data = await response.json();
      return data.token;
    } catch (error) {
      console.error('Error fetching CLI token:', error);
      throw error;
    }
  }, []);

  const sendAuthResult = useCallback((result) => {
    if (window.opener) {
      window.opener.postMessage(result, '*');
    } else {
      localStorage.setItem('cli-auth-result', JSON.stringify(result));
    }
  }, []);

  useNavigationAwareEffect(({ isCancelled }) => {
    if (status === 'authenticated' && !isCancelled) {
      setAuthState('authenticating');
      cancelablePromiseRef.current = makeCancelable(fetchToken());
      
      cancelablePromiseRef.current.promise
        .then(token => {
          if (!isCancelled) {
            sendAuthResult({ type: 'AUTH_SUCCESS', token });
            setAuthState('success');
            setTimeout(() => window.close(), 1000);
          }
        })
        .catch(error => {
          if (!error.isCanceled && !isCancelled) {
            console.error('Authentication error:', error);
            setError(error.message || 'Authentication failed');
            sendAuthResult({ type: 'AUTH_ERROR', error: error.message });
            setAuthState('error');
          }
        });

      return () => {
        if (cancelablePromiseRef.current) {
          cancelablePromiseRef.current.cancel();
        }
      };
    }
  }, [status, fetchToken, sendAuthResult]);

  const handleLogin = (provider) => {
    signIn(provider, { callbackUrl: window.location.href })
      .catch(error => {
        console.error('Sign-in error:', error);
        setError('Failed to initiate sign-in process');
      });
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              CLI Authentication
            </h2>
          </div>
          {!session && (
            <div className="mt-8 space-y-6">
              <div className="rounded-md shadow-sm -space-y-px">
                <button
                  onClick={() => handleLogin('google')}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign in with Google
                </button>
                <button
                  onClick={() => handleLogin('github')}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mt-3"
                >
                  Sign in with GitHub
                </button>
              </div>
            </div>
          )}
          {session && (
            <div className="mt-8 text-center">
              {authState === 'authenticating' && <div>Authenticating CLI...</div>}
              {authState === 'success' && <div>Authentication successful! You can close this window.</div>}
              {authState === 'error' && <div>Authentication failed: {error}</div>}
            </div>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
}
