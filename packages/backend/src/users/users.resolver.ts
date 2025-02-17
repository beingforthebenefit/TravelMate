import { Resolver, Query } from '@nestjs/graphql';
import { User } from './user.entity';
import { PrismaService } from '../prisma/prisma.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => [User])
  async users(): Promise<User[]> {
    return this.prisma.user.findMany();
  }
}