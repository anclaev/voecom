// import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService, QUEUES } from '@voecom/common';
import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RMQModule } from 'nestjs-rmq';

@Module({
  imports: [
    RMQModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          exchangeName: 'auth_service',
          connections: [
            {
              login: config.getValue('RABBITMQ_DEFAULT_USER'),
              password: config.getValue('RABBITMQ_DEFAULT_PASS'),
              host: `${config.getValue('RABBITMQ_HOST')}`,
              port: Number(config.getValue('RABBITMQ_PORT')),
            },
          ],
          queueName: QUEUES.AUTH,
          logMessages: process.env.NODE_ENV === 'development',
          queueOptions: {
            durable: false,
          },
          serviceName: 'AUTH_SERVICE',
        };
      },
    }),
    // ClientsModule.registerAsync({
    //   clients: [
    //     {
    //       name: QUEUES.AUTH_QUEUE,
    //       inject: [ConfigService],
    //       useFactory: (config: ConfigService) => ({
    //         transport: Transport.RMQ,
    //         options: {
    //           urls: [config.getValue<string>('RABBITMQ_URL')],
    //           queue: QUEUES.AUTH_QUEUE,
    //           queueOptions: {
    //             durable: false,
    //           },
    //         },
    //       }),
    //     },
    //   ],
    // }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
