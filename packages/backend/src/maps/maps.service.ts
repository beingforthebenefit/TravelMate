import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class MapsService {
  private readonly mapboxApiKey = process.env.MAPBOX_API_KEY;

  constructor(private readonly httpService: HttpService) {
    if (!this.mapboxApiKey) {
      throw new Error('MAPBOX_API_KEY is not set in environment variables');
    }
  }

  async searchLocations(query: string): Promise<any> {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      query,
    )}.json?access_token=${this.mapboxApiKey}&limit=5`;

    try {
      const response: AxiosResponse<any> = await firstValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch locations');
    }
  }
}