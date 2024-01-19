import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Response } from 'express';

@Catch(RpcException)
export class RpcExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const error = exception.getError() as any;
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const statusCode =
      error && typeof error !== 'string' ? error.statusCode : 400;

    response.status(statusCode).json(error);
  }
}
