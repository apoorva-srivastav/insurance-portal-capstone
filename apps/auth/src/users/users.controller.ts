import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../gaurds/auth.guard';

@Controller('users')
export class UsersController {
  constructor(public usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get()
  listUsers() {
    return this.usersService.findAll();
  }

  @UseGuards(AuthGuard)
  @Post('user')
  getUser(@Body() body) {
    return this.usersService.findOneUser(body.username);
  }

  @Post('signIn')
  createUser(@Body() body) {
    return this.usersService.create(body);
  }
}
