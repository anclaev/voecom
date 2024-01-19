import {
  ConfigService,
  LoggerFactory,
  // RpcExceptionFilter,
} from '@voecom/common';

import { Logger, ValidationPipe } from '@nestjs/common';
import fingerprint from 'express-fingerprint';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';

import { SerializerInterceptor } from './app/core/interceptors/serializer.interceptor';

import { AppModule } from './app/app.module';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule, {
    logger: LoggerFactory('Voecom Core'),
  });
  const { httpAdapter } = app.get(HttpAdapterHost);

  const instance = httpAdapter.getInstance();
  const config = app.get(ConfigService);

  const allowedOrigins = config.getValue<string>('ALLOWED_ORIGINS');
  const cookieSecret = config.getValue<string>('COOKIE_SECRET');

  const port = config.getValue<number>('API_PORT') || 3001;

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    })
  );

  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
  });

  app.useGlobalInterceptors(new SerializerInterceptor());

  // app.useGlobalFilters(new RpcExceptionFilter());

  app.use(cookieParser(cookieSecret));

  instance.use(fingerprint());

  await app
    .listen(port)
    .finally(() => Logger.log(`Started on ${port} port...`, 'NestApplication'));
};

bootstrap();
