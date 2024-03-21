import { Body, Controller, Inject, Post } from '@nestjs/common';
import { AppService } from './app.service';

import { ClientProxy } from '@nestjs/microservices';
import { User } from './dto/user.entity';
import { firstValueFrom } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy,
    @Inject('AUTH_SERVICE') private readonly authServiceClient: ClientProxy,) {}

  
  @Post('/login')
  async login(@Body() signInDto: User ) {
    const newUser = await firstValueFrom(this.userServiceClient.send('user_search_by_credentials', signInDto));
    const token = this.authServiceClient.send('generate_token', newUser);
    return token;
    
  }

  @Post('/signIn')
  signIn(@Body() signInDto: User ) {
    const newUser = this.userServiceClient.send('create_new_user', signInDto);
    return newUser;
  }

  


}
