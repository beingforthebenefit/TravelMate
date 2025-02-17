import { Module } from '@nestjs/common';
import { ItinerariesResolver } from './itineraries.resolver';

@Module({
  providers: [ItinerariesResolver],
})
export class ItinerariesModule {}
