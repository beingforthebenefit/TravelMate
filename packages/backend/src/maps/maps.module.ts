import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MapsService } from './maps.service';
import { MapsResolver } from './map.resolver';

@Module({
    imports: [HttpModule],
    providers: [MapsService, MapsResolver],
    exports: [MapsService],
})
export class MapsModule {}