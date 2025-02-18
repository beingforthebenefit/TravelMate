"use client";

import { GET_USERS } from "@/lib/queries";
import { GetUsersData } from "@/lib/types";
import { useQuery } from "@apollo/client";

export default function TestPage() {
  const { loading, error, data } = useQuery<GetUsersData>(GET_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">TravelMate Users</h1>
      <ul>
        {data?.users.map((user) => (
          <li key={user.id}>
            {user.email} - {user.name || "No Name"}
          </li>
        ))}
      </ul>
    </div>
  );
}
