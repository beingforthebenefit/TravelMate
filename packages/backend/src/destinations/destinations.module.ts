import { Module } from '@nestjs/common';
import { DestinationsResolver } from './destinations.resolver';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [DestinationsResolver],
})
export class DestinationsModule {}
