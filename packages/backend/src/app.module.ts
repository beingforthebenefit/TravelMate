import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { ItinerariesModule } from './itineraries/itineraries.module';
import { DestinationsModule } from './destinations/destinations.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true, // enables the GraphQL playground
    }),
    UsersModule,
    ItinerariesModule,
    DestinationsModule,
  ],
})
export class AppModule {}
