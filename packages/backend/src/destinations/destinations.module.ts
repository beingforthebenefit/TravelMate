import { Module } from '@nestjs/common';
import { DestinationsResolver } from './destinations.resolver';

@Module({
  providers: [DestinationsResolver],
})
export class DestinationsModule {}
