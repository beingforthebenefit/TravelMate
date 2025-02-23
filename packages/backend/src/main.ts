import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

export async function createApp() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000',
  });
  return app;
}

export async function bootstrap() {
  const app = await createApp();
  await app.listen(process.env.PORT ?? 3001);
  console.log(
    `🚀 Server ready at: http://localhost:${process.env.PORT ?? 3001}/graphql`,
  );
}

if (process.env.NODE_ENV !== 'test') {
  bootstrap();
}
