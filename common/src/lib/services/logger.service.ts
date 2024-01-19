import { ConsoleLogger, Injectable } from '@nestjs/common';

@Injectable()
export class LoggerService extends ConsoleLogger {
  constructor() {
    super('[Voecom]');
  }

  setCtx(ctx: string) {
    this.context = ctx;
  }
}
