import { ConfigService as RootService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

import { ENV } from '../interfaces/env';

@Injectable()
export class ConfigService extends RootService {
  constructor() {
    super();
  }

  getValue<T>(value: keyof ENV) {
    return this.get<T>(value) as T;
  }
}
