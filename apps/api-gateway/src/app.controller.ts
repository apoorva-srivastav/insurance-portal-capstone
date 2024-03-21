import { Body, Controller, HttpCode, HttpStatus, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiBody, ApiExtraModels, ApiOperation, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';

import { AppService } from './app.service';
import { User, loginDto, loginResponseDto, signUpResponseDto } from './dto/user.dto';
import { firstValueFrom } from 'rxjs';

@ApiBearerAuth()
@ApiTags('auth')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy,
    @Inject('AUTH_SERVICE') private readonly authServiceClient: ClientProxy,) {}

  
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login user' })
  @ApiExtraModels(loginDto)
  @ApiResponse({ type: loginResponseDto })
  @Post('/login')
  async login(@Body() loginDto: loginDto ): Promise<string> {
    const existingUser = await firstValueFrom(this.userServiceClient.send('user_search_by_credentials', loginDto));
    const token = await firstValueFrom(this.authServiceClient.send('generate_token', existingUser));
    return token;
  }

  @HttpCode(HttpStatus.OK)
  @ApiResponse({ type: signUpResponseDto })
  @Post('/signUp')
  async signUp(@Body() signUpDto: User ): Promise<User> {
    const newUser = await firstValueFrom(this.userServiceClient.send('create_new_user', signUpDto));
    return newUser;
  }

}
