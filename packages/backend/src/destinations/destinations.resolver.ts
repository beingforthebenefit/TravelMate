import { Resolver, Query } from '@nestjs/graphql';
import { Destination } from './destination.entity';

@Resolver(() => Destination)
export class DestinationsResolver {
  @Query(() => [Destination])
  async destinations(): Promise<Destination[]> {
    // Dummy data; replace with real data via Prisma later.
    return [
      {
        id: 1,
        name: 'Eiffel Tower',
        description: 'Iconic tower in Paris',
        latitude: 48.8584,
        longitude: 2.2945,
        createdAt: new Date(),
      },
      {
        id: 2,
        name: 'Tokyo Tower',
        description: 'Famous tower in Tokyo',
        latitude: 35.6586,
        longitude: 139.7454,
        createdAt: new Date(),
      },
    ];
  }
}
