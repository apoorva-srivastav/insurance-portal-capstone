import { Controller, HttpCode, HttpStatus, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
  protected readonly logger = new Logger(AuthController.name);

  constructor(private authService: AuthService) {}


  @HttpCode(HttpStatus.OK)
  @MessagePattern('generate_token')
  public async createToken(data) {
    let result;
      try {
        result = await this.authService.createToken(data);
      } catch (e) {
        result = {
          status: HttpStatus.BAD_REQUEST,
          message: 'token_create_bad_request',
          data: null,
        };
      }
    return result;
  }

  @HttpCode(HttpStatus.OK)
  @MessagePattern('token_decode')
  public async decodeToken(data: {
    token: string;
  }): Promise<any> {
    const tokenData = await this.authService.decodeToken(data.token);
    
    return {
      status: tokenData ? HttpStatus.OK : HttpStatus.UNAUTHORIZED,
      message: tokenData ? 'token_decode_success' : 'token_decode_unauthorized',
      data: tokenData,
    };
  }
}
