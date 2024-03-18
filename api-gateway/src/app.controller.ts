import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';

import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { ClientProxy } from '@nestjs/microservices';
import { User } from './dto/user.entity';
import { Role, Roles } from './decorators/roles.decorator';
import { AuthGuard } from './gaurds/auth.guard';
import { RolesGuard } from './gaurds/role.gaurd';
import { Authorization } from './decorators/authorization.decorator';
import { map } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy,
    @Inject('AUTH_SERVICE') private readonly authServiceClient: ClientProxy,) {}

  
  @Post('/login')
  async login(@Body() signInDto: User ) {
    const newUser = await firstValueFrom(this.userServiceClient.send('user_search_by_credentials', signInDto));
    const token = this.authServiceClient.send('generate_token', newUser)
  //console.log('logged in>>>>>', signInDto, newUser)
    return token;
    
  }

  @Post('/signIn')
  signIn(@Body() signInDto: User ) {
    const newUser = this.userServiceClient.send('create_new_user', signInDto);

    return newUser;
  }

  


}
