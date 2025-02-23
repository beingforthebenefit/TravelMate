import { Resolver, Query } from '@nestjs/graphql';
import { Destination } from './destination.entity';
import { PrismaService } from '../prisma/prisma.service';

@Resolver(() => Destination)
export class DestinationsResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => [Destination])
  async destinations(): Promise<Destination[]> {
    return this.prisma.destination.findMany();
  }
}
