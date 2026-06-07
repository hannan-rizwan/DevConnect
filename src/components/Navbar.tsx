"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <Link href="/" className="text-xl font-bold text-primary-600">DevConnect</Link>
        <div className="flex items-center gap-6">
          <Link href="/explore" className="text-gray-600 hover:text-gray-900">Explore</Link>
          <Link href="/projects" className="text-gray-600 hover:text-gray-900">Projects</Link>
          {session ? (
            <>
              <Link href="/blog/new" className="text-gray-600 hover:text-gray-900">Write</Link>
              <Link href={`/profile/${(session.user as any).id}`} className="text-gray-600 hover:text-gray-900">Profile</Link>
              <button onClick={() => signOut()} className="text-sm text-red-600">Sign Out</button>
            </>
          ) : (
            <Link href="/login" className="btn-primary text-sm">Sign In</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
