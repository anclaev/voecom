import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@voecom/common';
import fingerprint from 'express-fingerprint';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';

import { SerializerInterceptor } from './app/core/interceptors/serializer.interceptor';

import { AppModule } from './app/app.module';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  const httpAdapter = app.getHttpAdapter();
  const instance = httpAdapter.getInstance();
  const config = app.get(ConfigService);

  const allowedOrigins = config.getValue<string>('ALLOWED_ORIGINS');
  const cookieSecret = config.getValue<string>('COOKIE_SECRET');

  const port = process.env.API_PORT || 3001;
  const host = process.env.API_HOST || 'localhost';

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    })
  );

  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
  });

  app.useGlobalInterceptors(new SerializerInterceptor());

  app.use(cookieParser(cookieSecret));

  instance.use(fingerprint());

  await app.listen(port).finally(() => {
    console.log(`🚀 Application is running on ${host}:${port}!`);
  });
};

bootstrap();
