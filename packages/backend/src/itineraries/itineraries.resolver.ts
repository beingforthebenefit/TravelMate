import { Resolver, Query } from '@nestjs/graphql';
import { Itinerary } from './itinerary.entity';
import { PrismaService } from '../prisma/prisma.service';

@Resolver(() => Itinerary)
export class ItinerariesResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => [Itinerary])
  async itineraries(): Promise<Itinerary[]> {
    return this.prisma.itinerary.findMany();
  }
}
