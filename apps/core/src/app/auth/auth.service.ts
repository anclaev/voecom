import { Inject, Injectable } from '@nestjs/common';
import { ClientRMQ } from '@nestjs/microservices';
import { QUEUES } from '@voecom/common';

@Injectable()
export class AuthService {
  constructor(
    @Inject(QUEUES.AUTH_QUEUE) private readonly authClient: ClientRMQ
  ) {}
}
