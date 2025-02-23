import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { User } from '../users/user.entity';
import { RegisterInput } from './dto/register.input';
import { LoginInput } from './dto/login.input';
import { LoginPayload } from './dto/login.payload';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

@Resolver()
export class AuthResolver {
    constructor(private prisma: PrismaService) { }

    @Mutation(() => User)
    async register(
        @Args('data') data: RegisterInput
    ): Promise<User> {
        const existingUser = await this.prisma.user.findUnique({
            where: { email: data.email },
        });
        if (existingUser) {
            throw new Error('User already exists with that email.');
        }
        const hashedPassword = await bcrypt.hash(data.password, 10);
        return this.prisma.user.create({
            data: {
                email: data.email,
                name: data.name,
                password: hashedPassword,
            },
        });
    }

    @Mutation(() => LoginPayload)
    async login(
        @Args('data') data: LoginInput
    ): Promise<LoginPayload> {
        const user = await this.prisma.user.findUnique({
            where: { email: data.email },
        });
        if (!user) {
            throw new Error('Invalid credentials');
        }
        const isValid = await bcrypt.compare(data.password, user.password);
        if (!isValid) {
            throw new Error('Invalid credentials');
        }
        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET || 'defaultsecret',
            { expiresIn: '1h' }
        );
        return { token, user };
    }
}
