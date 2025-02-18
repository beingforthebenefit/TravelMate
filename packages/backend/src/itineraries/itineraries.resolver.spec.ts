import { Test, TestingModule } from '@nestjs/testing';
import { ItinerariesResolver } from './itineraries.resolver';
import { PrismaService } from '../prisma/prisma.service';

describe('ItinerariesResolver', () => {
  let resolver: ItinerariesResolver;
  let prismaService: PrismaService;

  const dummyItineraries = [
    { id: 1, title: 'Trip to Paris', description: 'A lovely trip to Paris', createdAt: new Date() },
    { id: 2, title: 'Trip to Tokyo', description: 'An exciting journey through Tokyo', createdAt: new Date() },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItinerariesResolver,
        {
          provide: PrismaService,
          useValue: {
            itinerary: {
              findMany: jest.fn().mockResolvedValue(dummyItineraries),
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<ItinerariesResolver>(ItinerariesResolver);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should return an array of itineraries', async () => {
    const itineraries = await resolver.itineraries();
    expect(itineraries).toEqual(dummyItineraries);
    expect(prismaService.itinerary.findMany).toHaveBeenCalled();
  });
});
