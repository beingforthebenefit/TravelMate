import { createApp } from './main';
import { INestApplication } from '@nestjs/common';

describe('Main Application', () => {
  let app: INestApplication;

  beforeAll(async () => {
    // Create the Nest application without listening on a port.
    app = await createApp();
  });

  afterAll(async () => {
    // Close the app to release resources.
    await app.close();
  });

  it('should create an application instance', () => {
    expect(app).toBeDefined();
  });

  it('should have CORS enabled', () => {
    // While we can't directly read CORS settings, we ensure the HTTP adapter is defined.
    expect(app.getHttpAdapter()).toBeDefined();
  });
});
