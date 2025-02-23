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
      // Return dummyUser if email matches; otherwise, null.
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

    // Simulate that no user exists with that email.
    prismaService.user.findUnique = jest.fn().mockResolvedValue(null);
    // Mock bcrypt.hash to return 'hashedpassword'
    jest
      .spyOn(bcrypt, 'hash')
      .mockImplementation((data: string, saltOrRounds: number) =>
        Promise.resolve('hashedpassword'),
      );

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

  // it('should login an existing user with correct password', async () => {
  //   const loginInput: LoginInput = {
  //     email: dummyUser.email,
  //     password: 'plaintextpassword',
  //   };

  //   // Mock bcrypt.compare to simulate a valid password
  //   jest
  //     .spyOn(bcrypt, 'compare')
  //     .mockImplementation((password: string, hash: string) => Promise.resolve(true));

  //   // Mock jwt.sign to return a dummy token
  //   jest.spyOn(jwt, 'sign').mockReturnValue('dummyToken');

  //   const result = await resolver.login(loginInput);
  //   expect(result.token).toEqual('dummyToken');
  //   expect(result.user).toEqual(dummyUser);
  // });

  it('should fail login with incorrect password', async () => {
    const loginInput: LoginInput = {
      email: dummyUser.email,
      password: 'wrongpassword',
    };

    // Simulate bcrypt.compare returning false for incorrect password
    jest
      .spyOn(bcrypt, 'compare')
      .mockImplementation((password: string, hash: string) =>
        Promise.resolve(false),
      );

    await expect(resolver.login(loginInput)).rejects.toThrow(
      'Invalid credentials',
    );
  });

  it('should fail login for a non-existent user', async () => {
    const loginInput: LoginInput = {
      email: 'nonexistent@example.com',
      password: 'any',
    };

    await expect(resolver.login(loginInput)).rejects.toThrow(
      'Invalid credentials',
    );
  });
});
