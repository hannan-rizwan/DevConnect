'use client';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';

export function Navbar() {
  const { data: session } = useSession();
  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="text-2xl font-bold text-indigo-600">DevConnect</Link>
          <div className="flex items-center gap-6">
            <Link href="/explore" className="text-gray-600 hover:text-gray-900">Explore</Link>
            <Link href="/tags" className="text-gray-600 hover:text-gray-900">Tags</Link>
            {session ? (
              <>
                <Link href="/new" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">Write Post</Link>
                <button onClick={() => signOut()} className="text-gray-600 hover:text-gray-900">Sign Out</button>
              </>
            ) : (
              <button onClick={() => signIn()} className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">Sign In</button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
