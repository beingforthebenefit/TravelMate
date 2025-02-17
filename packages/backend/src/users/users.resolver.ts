import { Resolver, Query } from '@nestjs/graphql';
import { User } from './user.entity';
// Import your Prisma service here to fetch real data, for now we'll use dummy data.
import { Injectable } from '@nestjs/common';

@Injectable()
@Resolver(() => User)
export class UsersResolver {
  @Query(() => [User])
  async users(): Promise<User[]> {
    // For now, return dummy data. Later, integrate with Prisma.
    return [
      {
        id: 1,
        email: 'user1@example.com',
        name: 'User One',
        createdAt: new Date(),
      },
      {
        id: 2,
        email: 'user2@example.com',
        name: 'User Two',
        createdAt: new Date(),
      },
    ];
  }
}
