import { CallHandler, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class SerializerInterceptor implements NestInterceptor {
  intercept(_: unknown, next: CallHandler<unknown>): Observable<unknown> {
    return next.handle().pipe(
      map((value) => {
        if (value !== null && value['password']) value['password'] = undefined;
        return value;
      })
    );
  }
}
