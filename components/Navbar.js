import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        {session ? (
          <>
            <li>
              <Link href="/profile">Profile</Link>
            </li>
            <li>
              <Link href="/subscription">Subscription</Link>
            </li>
            <li>
              <button onClick={() => signOut()}>Sign out</button>
            </li>
          </>
        ) : (
          <li>
            <Link href="/api/auth/signin">Sign in</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
