import { Test, TestingModule } from '@nestjs/testing';
import { AuthResolver } from './auth.resolver';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterInput } from './dto/register.input';
import { LoginInput } from './dto/login.input';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

describe('AuthResolver', () => {
  let resolver: AuthResolver;
  let prismaService: PrismaService;

  const dummyUser = {
    id: 1,
    email: 'test@example.com',
    name: 'Test User',
    password: 'hashedpassword',
    createdAt: new Date(),
  };

  const prismaServiceMock = {
    user: {
      findUnique: jest.fn((args) => {
        if (args.where.email === dummyUser.email) {
          return Promise.resolve(dummyUser);
        }
        return Promise.resolve(null);
      }),
      create: jest.fn().mockResolvedValue(dummyUser),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthResolver,
        { provide: PrismaService, useValue: prismaServiceMock },
      ],
    }).compile();

    resolver = module.get<AuthResolver>(AuthResolver);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should register a new user', async () => {
    const registerInput: RegisterInput = {
      email: 'new@example.com',
      name: 'New User',
      password: 'plaintextpassword',
    };

    // For this test, simulate that no user exists.
    prismaService.user.findUnique = jest.fn().mockResolvedValue(null);
    // Override bcrypt.hash to return 'hashedpassword'
    jest
      .spyOn(bcrypt, 'hash')
      .mockImplementation(((data: string, saltOrRounds: number) =>
        Promise.resolve('hashedpassword')) as any);

    const result = await resolver.register(registerInput);
    expect(result).toEqual(dummyUser);
    expect(prismaService.user.create).toHaveBeenCalledWith({
      data: {
        email: 'new@example.com',
        name: 'New User',
        password: 'hashedpassword',
      },
    });
  });

  // it('should login an existing user', async () => {
  //     const loginInput: LoginInput = {
  //         email: dummyUser.email,
  //         password: 'plaintextpassword',
  //     };

  //     // Override bcrypt.compare so that it always resolves to true
  //     jest
  //         .spyOn(bcrypt, 'compare')
  //         .mockImplementation(((password: string, hash: string) => Promise.resolve(true)) as any);

  //     // Spy on jwt.sign to return a dummy token
  //     const token = 'dummyToken';
  //     jest.spyOn(jwt, 'sign').mockReturnValue(token);

  //     const result = await resolver.login(loginInput);
  //     expect(result.token).toEqual(token);
  //     expect(result.user).toEqual(dummyUser);
  // });

  it('should fail login with wrong credentials', async () => {
    const loginInput: LoginInput = {
      email: 'nonexistent@example.com',
      password: 'any',
    };

    await expect(resolver.login(loginInput)).rejects.toThrow(
      'Invalid credentials',
    );
  });
});
