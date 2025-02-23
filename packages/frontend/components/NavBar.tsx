"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import UserProfile from "./UserProfile";

export default function NavBar() {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem("token");
        router.push("/auth/login");
    };

    return (
        <nav className="bg-white dark:bg-gray-800 shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo on the left */}
                    <div className="flex items-center">
                        <Link href="/dashboard">
                            <img className="h-8 w-auto" src="/logo.svg" alt="TravelMate Logo" />
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
