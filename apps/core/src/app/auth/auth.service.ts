import {
  AUTH,
  CreateUserDto,
  // QUEUES,
  SignInDto,
} from '@voecom/common';

import { BadRequestException, Injectable } from '@nestjs/common';
// import { RpcException } from '@nestjs/microservices';
import { User } from '@prisma/client';
// import { catchError, throwError } from 'rxjs';
import {
  // RMQError,
  RMQService,
} from 'nestjs-rmq';
@Injectable()
export class AuthService {
  constructor(
    // @Inject(QUEUES.AUTH_QUEUE) private readonly authClient: ClientRMQ
    private readonly rmq: RMQService
  ) {}

  createUser(dto: CreateUserDto) {
    this.rmq
      .send<CreateUserDto, User>(AUTH.CREATE_USER, dto)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw new BadRequestException(err.message);
      });
    // .catch((err: RMQError) => {
    //   throw new RpcException(err);
    // });
    // .pipe(
    //   catchError((error) =>
    //     throwError(() => new RpcException(error.response))
    //   )
    //);
  }

  signIn(dto: SignInDto) {
    this.rmq
      .send<SignInDto, User>(AUTH.SIGN_IN, dto)
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((err) => {
        console.log(err);
        throw new BadRequestException(err.message);
      });

    // .catch((err: RMQError) => {
    //   throw new RpcException(err);
    // });
    // .pipe(
    //   catchError((error) =>
    //     throwError(() => new RpcException(error.response))
    //   )
    // );
  }
}
