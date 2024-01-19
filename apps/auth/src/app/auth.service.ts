import { UserRepository, CreateUserDto, SignInDto } from '@voecom/common';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { RpcException } from '@nestjs/microservices';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private user: UserRepository) {}

  async signUp(dto: CreateUserDto): Promise<User> {
    return await this.user
      .createUser({
        ...dto,
        password: await bcrypt.hash(dto.password, 10),
      })
      .catch((err) => {
        throw new RpcException(new BadRequestException(err.message));
      });
  }

  async signIn(dto: SignInDto): Promise<User> {
    const user = await this.user.getUserByLogin(dto.login);

    // if (!user) {
    //   throw new RpcException(new UnauthorizedException('Bad credentials'));
    // }

    // const passwordIsMatching = await bcrypt.compare(
    //   user.password,
    //   dto.password
    // );

    // if (passwordIsMatching) {
    //   throw new RpcException(new UnauthorizedException('Bad credentials'));
    // }

    return user!;
  }
}
