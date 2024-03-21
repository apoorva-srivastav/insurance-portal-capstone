import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignInResponseDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  saltOrRounds: number = 10;
  constructor(
    private jwtService: JwtService,
  ) {}

   async createToken({userId, username, role}): Promise<string> {
    const token = this.jwtService.sign(
      {
        userId,
        role,
        username
      }
    );
    return token;
  }

  async decodeToken(token: string) {
    let result = null;

      try {
        const tokenData = await this.jwtService.decode(token, { complete: true });
        result = tokenData;
      } catch (e) {
        result = null;
      }
    
    return result;
  }
  
}
