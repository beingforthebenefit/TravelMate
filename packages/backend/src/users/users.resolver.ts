import { Resolver, Query, Args } from '@nestjs/graphql';
import { User } from './user.entity';
import { PrismaService } from '../prisma/prisma.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => [User])
  async users(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  @Query(() => User, { nullable: true })
  async user(@Args('id') id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  @Query(() => User, { nullable: true })
  async userByEmail(@Args('email') email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
}
