import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../gaurds/auth.guard';
import { RolesGuard } from '../gaurds/role.gaurd';
import { Role, Roles } from '../roles/roles.decorator';

@Controller('users')
export class UsersController {
  constructor(public usersService: UsersService) {}


  //@Roles(Role.Admin)
  //@UseGuards(AuthGuard, RolesGuard )
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

}
