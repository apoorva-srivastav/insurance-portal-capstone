import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  saltOrRounds: number = 10;
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const existingUser = await this.usersService.findOneUser(username);
    const isMatch = await bcrypt.compare(pass, existingUser?.password);

    if (!isMatch) {
      throw new UnauthorizedException();
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const payload = {
      username: username,
      userId: existingUser.userId,
      role: existingUser.role
    };
    
    return {
      existingUser,
      access_token: await this.jwtService.signAsync(payload),
      refresh_token: await this.jwtService.signAsync(payload, {secret: 'rt', expiresIn: '1w'})
    };
  }

  async signUp(username: string, pass: string, role: string): Promise<any> {
    const user = await this.usersService.findOneUser(username);
    if (user) {
      throw new BadRequestException('Username already in use.');
    }
    const hashPass = await bcrypt.hash(pass, this.saltOrRounds);

    const payload = {
      username: username,
      password: hashPass,
      role: role,
    };

    const newUser = await this.usersService.create(payload);

    return newUser;
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneUser(username);
    const isMatch = await bcrypt.compare(pass, user?.password);
    if (user && isMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
