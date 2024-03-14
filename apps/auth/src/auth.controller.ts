import { Body, Controller, Post, HttpCode, HttpStatus, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './roles/roles.decorator';

@Controller('auth')
export class AuthController {
  protected readonly logger = new Logger(AuthController.name);

  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signUp')
  signUp(@Body() signInDto: Record<string, any>) {
    return this.authService.signUp(signInDto.username, signInDto.password, signInDto.role);
  }
}
