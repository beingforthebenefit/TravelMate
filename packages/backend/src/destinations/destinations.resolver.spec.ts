import { Test, TestingModule } from '@nestjs/testing';
import { DestinationsResolver } from './destinations.resolver';
import { PrismaService } from '../prisma/prisma.service';

describe('DestinationsResolver', () => {
  let resolver: DestinationsResolver;
  let prismaService: PrismaService;

  const dummyDestinations = [
    {
      id: 1,
      name: 'Eiffel Tower',
      description: 'Iconic tower in Paris',
      latitude: 48.8584,
      longitude: 2.2945,
      createdAt: new Date(),
    },
    {
      id: 2,
      name: 'Tokyo Tower',
      description: 'Famous tower in Tokyo',
      latitude: 35.6586,
      longitude: 139.7454,
      createdAt: new Date(),
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DestinationsResolver,
        {
          provide: PrismaService,
          useValue: {
            destination: {
              findMany: jest.fn().mockResolvedValue(dummyDestinations),
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<DestinationsResolver>(DestinationsResolver);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should return an array of destinations', async () => {
    const destinations = await resolver.destinations();
    expect(destinations).toEqual(dummyDestinations);
    expect(prismaService.destination.findMany).toHaveBeenCalled();
  });
});
