import { ConfigService, LoggerFactory } from '@voecom/common';
import { Logger, ValidationPipe } from '@nestjs/common';
import fingerprint from 'express-fingerprint';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';

import { SerializerInterceptor } from './app/core/interceptors/serializer.interceptor';

import { AppModule } from './app/app.module';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule, {
    logger: LoggerFactory('Voecom Core'),
  });
  const httpAdapter = app.getHttpAdapter();
  const instance = httpAdapter.getInstance();
  const config = app.get(ConfigService);
  console.log('est');
  const allowedOrigins = config.getValue<string>('ALLOWED_ORIGINS');
  const cookieSecret = config.getValue<string>('COOKIE_SECRET');

  const port = config.getValue<number>('API_PORT') || 3001;

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
    Logger.log('Gateway successfully started!');
  });
};

bootstrap();
