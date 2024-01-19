import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService, LoggerFactory } from '@voecom/common';
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: LoggerFactory('Voencom Auth'),
  });

  const config = app.get(ConfigService);
  console.log('est');
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [config.getValue<string>('RABBITMQ_URL')],
      queue: 'AUTH_QUEUE',
      queueOptions: {
        durable: false,
      },
    },
  });

  await app
    .startAllMicroservices()
    .then(() => Logger.log('Microservice successfully started!'));
}

bootstrap();
