"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";
import { LOGIN } from "@/lib/queries";

export default function LoginPage() {
    const router = useRouter();
    const [error, setError] = useState("");
    const [loginMutation, { loading }] = useMutation(LOGIN);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get("email")?.toString() || "";
        const password = formData.get("password")?.toString() || "";

        if (!email || !password) {
            setError("Please fill in all fields");
            return;
        }

        try {
            const { data } = await loginMutation({
                variables: { data: { email, password } },
            });
            if (data?.login) {
                localStorage.setItem("token", data.login.token);
                router.push("/dashboard");
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unknown error occurred");
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <form
                onSubmit={handleSubmit}
                className="bg-white dark:bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md"
            >
                <h1 className="text-2xl font-bold mb-4 text-center">
                    Login to TravelMate
                </h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <div className="mb-4">
                    <label
                        className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
                        htmlFor="email"
                    >
                        Email
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="you@example.com"
                    />
                </div>
                <div className="mb-6">
                    <label
                        className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
                        htmlFor="password"
                    >
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="********"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-foreground text-background font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:opacity-90"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                    <a
                        className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                        href="/auth/register"
                    >
                        Register
                    </a>
                </div>
            </form>
        </div>
    );
}
