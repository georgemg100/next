import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Anthill Coder
        </Link>
        <div className="space-x-4">
          <Link href="/" className="hover:text-gray-300 transition duration-300">
            Home
          </Link>
          {session ? (
            <>
              <Link href="https://github.com/georgemg100/Anthill-Coder" className="hover:text-gray-300 transition duration-300">
                Download
              </Link>
              <Link href="/profile" className="hover:text-gray-300 transition duration-300">
                Profile
              </Link>
              <Link href="/subscription" className="hover:text-gray-300 transition duration-300">
                Subscription
              </Link>
              <button
                onClick={() => signOut()}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition duration-300"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link href="/" className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded transition duration-300">
              Sign In
            </Link>
          )
          }
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
