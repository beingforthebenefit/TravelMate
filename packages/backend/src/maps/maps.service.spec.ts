import { Test, TestingModule } from '@nestjs/testing';
import { MapsService } from './maps.service';
import { HttpModule } from '@nestjs/axios';
import { of } from 'rxjs';
import { AxiosHeaders, AxiosResponse } from 'axios';
import { InternalServerErrorException } from '@nestjs/common';
import { throwError } from 'rxjs';

describe('MapsService', () => {
  let service: MapsService;
  const dummyResponse: AxiosResponse<any> = {
    data: {
      features: [
        {
          place_name: 'Test Place',
          center: [1, 2],
        },
      ],
    },
    status: 200,
    statusText: 'OK',
    headers: new AxiosHeaders(),
    config: {
      headers: new AxiosHeaders(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [MapsService],
    }).compile();

    service = module.get<MapsService>(MapsService);
    // Override the read-only property using a type cast
    (service as any).mapboxApiKey = 'dummy_key';
  });

  it('should return location data', async () => {
    jest
      .spyOn(service['httpService'], 'get')
      .mockReturnValue(of(dummyResponse));
    const result = await service.searchLocations('Test');
    expect(result.features).toBeDefined();
    expect(result.features[0].place_name).toBe('Test Place');
  });

  it('should throw an InternalServerErrorException when API call fails', async () => {
    jest
      .spyOn(service['httpService'], 'get')
      .mockReturnValue(throwError(() => new Error('API error')));
    await expect(service.searchLocations('Test')).rejects.toThrow(
      InternalServerErrorException,
    );
  });
});
