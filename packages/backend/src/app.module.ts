import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { ItinerariesModule } from './itineraries/itineraries.module';
import { DestinationsModule } from './destinations/destinations.module';
import { PrismaModule } from './prisma/prisma.module';
import { MapsModule } from './maps/maps.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // When running tests, generate the schema in memory (boolean true)
      // Otherwise, write the schema to src/schema.gql.
      autoSchemaFile:
        process.env.NODE_ENV === 'test'
          ? true
          : join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true,
    }),
    PrismaModule,
    UsersModule,
    ItinerariesModule,
    DestinationsModule,
    MapsModule,
    AuthModule,
  ],
})
export class AppModule { }
