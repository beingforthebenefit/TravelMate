"use client";

import { gql, useQuery } from "@apollo/client";

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      email
      name
      createdAt
    }
  }
`;

export default function TestPage() {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">TravelMate Users</h1>
      <ul>
        {data.users.map((user: any) => (
          <li key={user.id}>
            {user.email} - {user.name || "No Name"}
          </li>
        ))}
      </ul>
    </div>
  );
}
