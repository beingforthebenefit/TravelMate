import { Test, TestingModule } from '@nestjs/testing';
import { UsersResolver } from './users.resolver';
import { PrismaService } from '../prisma/prisma.service';

describe('UsersResolver', () => {
  let resolver: UsersResolver;
  let prismaService: PrismaService;

  const dummyUsers = [
    { id: 1, email: 'user1@example.com', name: 'User One', createdAt: new Date() },
    { id: 2, email: 'user2@example.com', name: 'User Two', createdAt: new Date() },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersResolver,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findMany: jest.fn().mockResolvedValue(dummyUsers),
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<UsersResolver>(UsersResolver);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should return an array of users', async () => {
    const users = await resolver.users();
    expect(users).toEqual(dummyUsers);
    expect(prismaService.user.findMany).toHaveBeenCalled();
  });
});
