import { Resolver, Query } from '@nestjs/graphql';
import { Itinerary } from './itinerary.entity';

@Resolver(() => Itinerary)
export class ItinerariesResolver {
  @Query(() => [Itinerary])
  async itineraries(): Promise<Itinerary[]> {
    // Dummy data for now; later, replace with Prisma queries.
    return [
      {
        id: 1,
        title: 'Trip to Paris',
        description: 'A lovely trip to Paris.',
        createdAt: new Date(),
      },
      {
        id: 2,
        title: 'Trip to Tokyo',
        description: 'An exciting journey through Tokyo.',
        createdAt: new Date(),
      },
    ];
  }
}
