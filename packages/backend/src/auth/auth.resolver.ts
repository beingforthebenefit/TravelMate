import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { User } from '../users/user.entity';
import { RegisterInput } from './dto/register.input';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Resolver()
export class AuthResolver {
    constructor(private prisma: PrismaService) { }

    @Mutation(() => User)
    async register(
        @Args('data') data: RegisterInput
    ): Promise<User> {
        // Check if a user with the same email already exists
        const existingUser = await this.prisma.user.findUnique({
            where: { email: data.email },
        });
        if (existingUser) {
            throw new Error('User already exists with that email.');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(data.password, 10);

        // Create and return the new user
        return this.prisma.user.create({
            data: {
                email: data.email,
                name: data.name,
                password: hashedPassword,
            },
        });
    }
}
