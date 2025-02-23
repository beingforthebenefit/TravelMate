"use client";

import Link from "next/link";

export default function NavBar() {
    return (
        <nav className="bg-white dark:bg-gray-800 shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo on the left */}
                    <div className="flex items-center">
                        <Link href="/dashboard">
                            <img
                                className="h-8 w-auto"
                                src="/logo.svg"
                                alt="TravelMate Logo"
                            />
                        </Link>
                    </div>
                    {/* User settings on the right */}
                    <div className="flex items-center">
                        <button className="text-gray-800 dark:text-gray-200 hover:text-blue-500 focus:outline-none">
                            User Settings
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
