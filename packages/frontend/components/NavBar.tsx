'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import UserProfile from './UserProfile';
import Image from 'next/image';
import Font from 'next/font/google';

export default function NavBar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/auth/login');
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow">
      <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
        <div className="flex justify-between h-16">
          {/* Logo on the left */}
          <div className="flex items-center">
            <Link href="/dashboard" className="flex items-center">
              <Image
                className="h-16 w-auto"
                src="/logo.svg"
                alt="TravelMate Logo"
                width={64}
                height={64}
                priority
              />
              <span className="text-2xl font-bold text-gray-800 dark:text-gray-200 ml-2">
                TravelMate
              </span>
            </Link>
          </div>
          {/* Right side: User Profile and Logout */}
          <div className="flex items-center space-x-4">
            <UserProfile />
            <button
              onClick={handleLogout}
              className="text-gray-800 dark:text-gray-200 hover:text-blue-500 focus:outline-none"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
