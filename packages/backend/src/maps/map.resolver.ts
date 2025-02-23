import {
  Resolver,
  Query,
  Args,
  Float,
  ObjectType,
  Field,
} from '@nestjs/graphql';
import { MapsService } from './maps.service';
import { Coordinates } from 'src/types';

@ObjectType()
class MapLocation {
  @Field(() => String)
  place_name: string;

  @Field(() => [Float], { nullable: true })
  center?: Coordinates;
}

@Resolver()
export class MapsResolver {
  constructor(private readonly mapsService: MapsService) {}

  @Query(() => [MapLocation])
  async searchLocations(@Args('query') query: string): Promise<MapLocation[]> {
    const data = await this.mapsService.searchLocations(query);
    // Extract and map fields from Mapbox response
    return data.features.map((feature: any) => ({
      place_name: feature.place_name,
      center: feature.center,
    }));
  }
}
