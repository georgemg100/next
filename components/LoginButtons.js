import { signIn, useSession } from 'next-auth/react';

const LoginButtons = () => {
  const { data: session } = useSession();

  if (session) {
    return null; // Don't show login buttons for authenticated users
  }

  return (
    <div>
      <button onClick={() => signIn('google')}>Sign in with Google</button>
      <button onClick={() => signIn('github')}>Sign in with GitHub</button>
      {/* Keep existing email sign-in button */}
    </div>
  );
};

export default LoginButtons;
