import { Test, TestingModule } from '@nestjs/testing';
import { AuthResolver } from './auth.resolver';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterInput } from './dto/register.input';
import * as bcrypt from 'bcryptjs';

describe('AuthResolver', () => {
    let resolver: AuthResolver;
    let prismaService: PrismaService;

    const dummyUser = {
        id: 1,
        email: 'test@example.com',
        name: 'Test User',
        createdAt: new Date(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthResolver,
                {
                    provide: PrismaService,
                    useValue: {
                        user: {
                            findUnique: jest.fn().mockResolvedValue(null),
                            create: jest.fn().mockResolvedValue(dummyUser),
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<AuthResolver>(AuthResolver);
        prismaService = module.get<PrismaService>(PrismaService);
    });

    it('should register a new user', async () => {
        const registerInput: RegisterInput = {
            email: 'test@example.com',
            name: 'Test User',
            password: 'plaintextpassword',
        };

        // Spy on bcrypt.hash to simulate hashing
        const hashSpy = jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedpassword' as never);

        const result = await resolver.register(registerInput);
        expect(result).toEqual(dummyUser);
        expect(prismaService.user.create).toHaveBeenCalledWith({
            data: {
                email: 'test@example.com',
                name: 'Test User',
                password: 'hashedpassword',
            },
        });
        hashSpy.mockRestore();
    });
});
