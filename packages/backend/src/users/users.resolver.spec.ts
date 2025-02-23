import { Test, TestingModule } from '@nestjs/testing';
import { UsersResolver } from './users.resolver';
import { PrismaService } from '../prisma/prisma.service';

describe('UsersResolver', () => {
  let resolver: UsersResolver;
  let prismaService: PrismaService;

  const dummyUsers = [
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

  const prismaServiceMock = {
    user: {
      findMany: jest.fn().mockResolvedValue(dummyUsers),
      findUnique: jest.fn((args) => {
        if (args.where) {
          if (args.where.id === 1) {
            return Promise.resolve(dummyUsers[0]);
          }
          if (args.where.email === 'user1@example.com') {
            return Promise.resolve(dummyUsers[0]);
          }
        }
        return Promise.resolve(null);
      }),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersResolver,
        { provide: PrismaService, useValue: prismaServiceMock },
      ],
    }).compile();

    resolver = module.get<UsersResolver>(UsersResolver);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return an array of users', async () => {
    const users = await resolver.users();
    expect(users).toEqual(dummyUsers);
    expect(prismaService.user.findMany).toHaveBeenCalled();
  });

  it('should return a user by ID', async () => {
    const userId = 1;
    const user = await resolver.user(userId);
    expect(user).toEqual(dummyUsers[0]);
    expect(prismaService.user.findUnique).toHaveBeenCalledWith({
      where: { id: userId },
    });
  });

  it('should return null if user not found by ID', async () => {
    const userId = 999;
    const user = await resolver.user(userId);
    expect(user).toBeNull();
    expect(prismaService.user.findUnique).toHaveBeenCalledWith({
      where: { id: userId },
    });
  });

  it('should return a user by email', async () => {
    const userEmail = 'user1@example.com';
    const user = await resolver.userByEmail(userEmail);
    expect(user).toEqual(dummyUsers[0]);
    expect(prismaService.user.findUnique).toHaveBeenCalledWith({
      where: { email: userEmail },
    });
  });

  it('should return null if user not found by email', async () => {
    const userEmail = 'notfound@example.com';
    const user = await resolver.userByEmail(userEmail);
    expect(user).toBeNull();
    expect(prismaService.user.findUnique).toHaveBeenCalledWith({
      where: { email: userEmail },
    });
  });
});
