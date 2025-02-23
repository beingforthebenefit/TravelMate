'use client';

import NavBar from '@/components/NavBar';
import useAuth from '@/components/useAuth';

export default function DashboardPage() {
  useAuth();

  // Dummy itinerary cards
  const cards = [
    {
      id: 1,
      title: 'Trip to Paris',
      description: 'A beautiful journey to Paris.',
    },
    {
      id: 2,
      title: 'Trip to Tokyo',
      description: 'Experience the vibrant culture of Tokyo.',
    },
    {
      id: 3,
      title: 'Trip to New York',
      description: 'Discover the city that never sleeps.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <NavBar />
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
          Dashboard
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {cards.map((card) => (
            <div
              key={card.id}
              className="bg-white dark:bg-gray-800 shadow rounded-lg p-6"
            >
              <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-200">
                {card.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
