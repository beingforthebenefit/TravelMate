import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Clear existing data (order matters due to relations)
    await prisma.destination.deleteMany({});
    await prisma.itinerary.deleteMany({});
    await prisma.user.deleteMany({});

    // Create a sample user with itineraries and destinations
    const john = await prisma.user.create({
        data: {
            email: 'john.doe@example.com',
            password: 'password123', // In production, make sure to hash passwords!
            name: 'John Doe',
            itineraries: {
                create: [
                    {
                        title: 'Trip to Paris',
                        description: 'A wonderful trip to Paris',
                        destinations: {
                            create: [
                                {
                                    name: 'Eiffel Tower',
                                    description: 'The iconic tower in Paris',
                                    latitude: 48.8584,
                                    longitude: 2.2945,
                                },
                                {
                                    name: 'Louvre Museum',
                                    description: 'World famous museum',
                                    latitude: 48.8606,
                                    longitude: 2.3376,
                                },
                            ],
                        },
                    },
                    {
                        title: 'Trip to Tokyo',
                        description: 'An exciting journey in Tokyo',
                        destinations: {
                            create: [
                                {
                                    name: 'Tokyo Tower',
                                    description: 'Famous tower in Tokyo',
                                    latitude: 35.6586,
                                    longitude: 139.7454,
                                },
                                {
                                    name: 'Senso-ji Temple',
                                    description: 'Historic temple in Asakusa',
                                    latitude: 35.7148,
                                    longitude: 139.7967,
                                },
                            ],
                        },
                    },
                ],
            },
        },
    });

    // Create another sample user
    const jane = await prisma.user.create({
        data: {
            email: 'jane.smith@example.com',
            password: 'password123',
            name: 'Jane Smith',
            itineraries: {
                create: [
                    {
                        title: 'Trip to New York',
                        description: 'Exploring the Big Apple',
                        destinations: {
                            create: [
                                {
                                    name: 'Statue of Liberty',
                                    description: 'Iconic landmark in New York',
                                    latitude: 40.6892,
                                    longitude: -74.0445,
                                },
                                {
                                    name: 'Central Park',
                                    description: 'Famous urban park',
                                    latitude: 40.7829,
                                    longitude: -73.9654,
                                },
                            ],
                        },
                    },
                ],
            },
        },
    });

    console.log('Seeding completed successfully.');
}

main()
    .catch((error) => {
        console.error('Seeding error:', error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
