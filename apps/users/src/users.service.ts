import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { User, createUserDto } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private usersRepository: Repository<User>) { }

    async getUsers(): Promise<User[]> {
        return await this.usersRepository.find();
    }

    async createUser(user: createUserDto): Promise<User> {
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
        const user = await this.usersRepository.findOne({
            select: ["username", "password", "role", "userId"],
            where: [{ "userId": userId }]
        });
        return this.sanitizeUser(user);
    }

    async updateUser(user: User): Promise<User> {
        return this.usersRepository.save(user)
    }

    async deleteUser(user: User): Promise<DeleteResult> {
        return this.usersRepository.delete(user);
    }

    sanitizeUser(user: User) {
        const sanitized = user;
        delete sanitized['password'];
        return sanitized;
      }
}