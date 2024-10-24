import { useState } from 'react';
import { signIn } from 'next-auth/react';
import Image from 'next/image';

export default function LoginButtons() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('Email is required');
      return false;
    }
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePassword = (password) => {
    if (!password) {
      setPasswordError('Password is required');
      return false;
    }
    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
      return false;
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      setPasswordError('Password must contain at least one uppercase letter');
      return false;
    }
    if (!/(?=.*[a-z])/.test(password)) {
      setPasswordError('Password must contain at least one lowercase letter');
      return false;
    }
    if (!/(?=.*\d)/.test(password)) {
      setPasswordError('Password must contain at least one number');
      return false;
    }
    if (!/(?=.*[!@#$%^&*])/.test(password)) {
      setPasswordError('Password must contain at least one special character (!@#$%^&*)');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    
    if (!validateEmail(email) || !validatePassword(password)) {
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError(result.error);
      }
    } catch (error) {
      setError('An error occurred during sign in');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    
    if (!validateEmail(email) || !validatePassword(password)) {
      return;
    }

    try {
      setLoading(true);
      setError('');

      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      // Sign in after successful signup
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError(result.error);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <form className="flex flex-col space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            validateEmail(e.target.value);
          }}
          placeholder="Email"
          className="border p-2 rounded"
          required
        />
        {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
        
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            validatePassword(e.target.value);
          }}
          placeholder="Password"
          className="border p-2 rounded"
          required
        />
        {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
        
        {error && <p className="text-red-500">{error}</p>}
        
        <button
          onClick={handleSignIn}
          disabled={loading || emailError || passwordError || !email || !password}
          className="bg-blue-500 text-white p-2 rounded disabled:opacity-50"
        >
          {loading ? 'Loading...' : 'Sign In'}
        </button>
        
        <button
          onClick={handleSignUp}
          disabled={loading || emailError || passwordError || !email || !password}
          className="bg-green-500 text-white p-2 rounded disabled:opacity-50"
        >
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
      </form>

      <div className="flex items-center justify-center space-x-2">
        <div className="border-t flex-grow"></div>
        <span className="text-gray-500">Or continue with</span>
        <div className="border-t flex-grow"></div>
      </div>

      <div className="flex justify-center space-x-4">
        <button
          onClick={() => signIn('google')}
          className="flex items-center space-x-2 border p-2 rounded"
        >
          <Image src="/google.png" alt="Google" width={20} height={20} />
          <span>Google</span>
        </button>
        <button
          onClick={() => signIn('github')}
          className="flex items-center space-x-2 border p-2 rounded"
        >
          <Image src="/github.png" alt="GitHub" width={20} height={20} />
          <span>GitHub</span>
        </button>
      </div>
    </div>
  );
}
