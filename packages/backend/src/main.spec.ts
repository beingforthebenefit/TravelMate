import { bootstrap, createApp } from './main';
import { NestFactory } from '@nestjs/core';
import { HttpServer, INestApplication } from '@nestjs/common';

describe('Main bootstrap', () => {
  let listenMock: jest.Mock;
  let createAppSpy: jest.SpyInstance;
  let consoleLogSpy: jest.SpyInstance;
  let dummyApp: Partial<INestApplication>;

  beforeAll(() => {
    // Create a dummy app with listen and enableCors functions.
    listenMock = jest.fn().mockResolvedValue(undefined);
    dummyApp = {
      enableCors: jest.fn(),
      listen: listenMock,
      getHttpAdapter: () => ({} as HttpServer),
      close: async () => { },
    };

    // Spy on NestFactory.create to return our dummy app.
    createAppSpy = jest.spyOn(NestFactory, 'create').mockResolvedValue(dummyApp as INestApplication);

    // Spy on console.log to capture the startup log.
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => { });
  });

  afterAll(() => {
    createAppSpy.mockRestore();
    consoleLogSpy.mockRestore();
  });

  it('should create an application instance', async () => {
    const app = await createApp();
    expect(app).toBeDefined();
    // Since createApp calls enableCors, we expect it to be called exactly once.
    expect(dummyApp.enableCors).toHaveBeenCalledTimes(1);
  });

  it('bootstrap should call listen and log startup message', async () => {
    // Temporarily override NODE_ENV to simulate non-test environment.
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';

    await bootstrap();
    expect(listenMock).toHaveBeenCalled();
    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining('🚀 Server ready at: http://localhost:')
    );

    // Restore NODE_ENV
    process.env.NODE_ENV = originalEnv;
  });
});
