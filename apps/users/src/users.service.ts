import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private usersRepository: Repository<User>) { }

    async getUsers(): Promise<User[]> {
        return await this.usersRepository.find();
    }

    async createUser(user: User): Promise<User> {
        
      const hashPass = await bcrypt.hash(user.password, 10);
      const newUser =  this.usersRepository.create({...user, password: hashPass});
      return this.usersRepository.save(newUser);
    }


    async getUserByUsername(username: string): Promise<User> {
        return await this.usersRepository.findOne({
            select: ["username", "password", "role", "userId"],
            where: [{ "username": username }]
        });
    }

    async getUser(userId: string): Promise<User> {
        return await this.usersRepository.findOne({
            select: ["username", "password", "role", "userId"],
            where: [{ "userId": userId }]
        });
    }

    async updateUser(user: User) {
        this.usersRepository.save(user)
    }

    async deleteUser(user: User) {
        this.usersRepository.delete(user);
    }
}