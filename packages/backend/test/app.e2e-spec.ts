import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('should fetch users', async () => {
    const query = {
      query: `
        query {
          users {
            id
            email
            name
            createdAt
          }
        }
      `,
    };

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send(query)
      .expect(200);

    expect(response.body.data.users).toBeDefined();
    // You can add additional assertions if you have known test data.
  });

  it('should fetch itineraries', async () => {
    const query = {
      query: `
        query {
          itineraries {
            id
            title
            description
            createdAt
          }
        }
      `,
    };

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send(query)
      .expect(200);

    expect(response.body.data.itineraries).toBeDefined();
  });

  it('should fetch destinations', async () => {
    const query = {
      query: `
        query {
          destinations {
            id
            name
            description
            latitude
            longitude
            createdAt
          }
        }
      `,
    };

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send(query)
      .expect(200);

    expect(response.body.data.destinations).toBeDefined();
  });

  it('should search locations', async () => {
    const query = {
      query: `
        query {
          searchLocations(query: "New York") {
            place_name
            center
          }
        }
      `,
    };

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send(query)
      .expect(200);

    expect(response.body.data.searchLocations).toBeDefined();
  });

  afterAll(async () => {
    await app.close();
  });
});
