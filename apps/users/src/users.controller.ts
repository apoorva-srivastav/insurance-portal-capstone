import { Controller, Post, Body, Get, Put, Delete, Param, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { User, createUserDto } from './user.entity';
import { MessagePattern } from '@nestjs/microservices';
import e from 'express';

@Controller('users')
export class UsersController {

    constructor(private service: UsersService) { }

    @Get()
    test() {
        return 'user api working correctly';
    }

    @MessagePattern('users_list')
    @Get()
    getAll() {
        return this.service.getUsers();
    }

    @MessagePattern('user_search_by_credentials')
    public async searchUserByCredentials(searchParams: {
        username: string;
        password: string;
    }): Promise<User | unknown> {
        let user: any;

        user = await this.service.getUserByUsername(searchParams.username);

        if (!user) {
            const excep =  new BadRequestException('User not found. Signup to login.');
            return excep.getResponse();
        }

        return user;
    }

    @MessagePattern('user_search_by_id')
    async get(@Body() userId):Promise<User>  {
        const user = await this.service.getUser(userId);
        return user
    }

    @MessagePattern('create_new_user')
    async create(@Body() user): Promise<User | unknown> {
        const existingUser = await this.service.getUserByUsername(user.username);
        if (existingUser) {
            const excep = new BadRequestException('Username already in use.');
            return excep.getResponse();
        }

        return this.service.createUser(user);
    }

    @MessagePattern('update_user')
    @Put()
    update(@Body() user: User): Promise<User> {
        const updatedUser =  this.service.updateUser(user);
        return updatedUser;
    }

    @Delete(':id')
    deleteUser(@Param() params) {
        return this.service.deleteUser(params.id);
    }
}