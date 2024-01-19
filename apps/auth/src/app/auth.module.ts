import { CommonModule, UserRepository } from '@voecom/common';
import { PrismaService } from 'nestjs-prisma';
import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [CommonModule],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, UserRepository],
})
export class AuthModule {}
