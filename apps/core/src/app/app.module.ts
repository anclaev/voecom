import { ClientsModule, Transport } from '@nestjs/microservices';
import { CommonModule, ConfigService, QUEUES } from '@voecom/common';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    CommonModule,
    ClientsModule.registerAsync({
      clients: [
        {
          name: 'AUTH_SERVICE',
          inject: [ConfigService],
          useFactory: (config: ConfigService) => ({
            transport: Transport.RMQ,
            options: {
              urls: [config.getValue<string>('RABBITMQ_URL')],
              queue: QUEUES.AUTH_QUEUE,
              queueOptions: {
                durable: false,
              },
            },
          }),
        },
      ],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
