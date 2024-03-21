import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignInResponseDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  saltOrRounds: number = 10;
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneUser(username);
    const isMatch = await bcrypt.compare(pass, user?.password);
    if (user && isMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

   async createToken({userId, username, role}): Promise<any> {
    const token = this.jwtService.sign(
      {
        userId,
        role,
        username
      }
    );
    return {
      user_id: userId,
      token,
    };
  }

  async decodeToken(token: string) {
    let result = null;

      try {
        const tokenData = await this.jwtService.decode(token, { complete: true });
        console.log('token decoded val>>>>',token, '>>>>', tokenData)
        result = tokenData;
      } catch (e) {
        result = null;
      }
    
    return result;
  }
  
}
