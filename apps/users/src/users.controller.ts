import { Controller, Post, Body, Get, Put, Delete, Param, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { MessagePattern } from '@nestjs/microservices';

@Controller('users')
export class UsersController {

    constructor(private service: UsersService) { }

    @MessagePattern('users_list')
    @Get()
    getAll() {
        return this.service.getUsers();
    }

    @MessagePattern('user_search_by_credentials')
    public async searchUserByCredentials(searchParams: {
        username: string;
        password: string;
    }): Promise<User> {
        let user: any;

        user = await this.service.getUserByUsername(searchParams.username);
        //console.log('user_search_by_credentials >>>', user, searchParams.username)
        return user;
    }

    @MessagePattern('user_search_by_id')
    async get(@Body() userId) {
        const user = await  this.service.getUser(userId);
        //console.log('user_search_by_id >>>', userId, user)
        return user
    }

    @MessagePattern('create_new_user')
    @Post('create')
    async create(@Body() user: User) {
    const existingUser = await this.service.getUserByUsername(user.username);

    if (existingUser) {
      throw new BadRequestException('Username already in use.');
    }
        return this.service.createUser(user);
    }

    @MessagePattern('update_user')
    @Put()
    update(@Body() user: User) {
        return this.service.updateUser(user);
    }

    @Delete(':id')
    deleteUser(@Param() params) {
        return this.service.deleteUser(params.id);
    }
}