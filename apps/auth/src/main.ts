import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { LoggerFactory, QUEUES } from '@voecom/common';
import { NestFactory } from '@nestjs/core';

import { AuthModule } from './app/auth.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthModule,
    {
      logger: LoggerFactory('Voencom Auth'),
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL!],
        queue: QUEUES.AUTH,
        queueOptions: {
          durable: false,
        },
      },
    }
  );

  await app.listen();
}

bootstrap();
