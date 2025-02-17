import { Module } from '@nestjs/common';
import { ItinerariesResolver } from './itineraries.resolver';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ItinerariesResolver],
})
export class ItinerariesModule {}
