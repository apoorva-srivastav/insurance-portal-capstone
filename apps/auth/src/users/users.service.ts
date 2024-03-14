import { Injectable } from '@nestjs/common';
import * as uuid from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { SignUpDto, UserDto } from '../dto/signUp.dto';
import { IUser } from '../interface/user.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<IUser>,
  ) {}

  async findAll(): Promise<IUser[]> {
    return this.userModel.find();
  }

  async findOneUser(username: string): Promise<IUser> {
    return this.userModel.findOne({ username });
  }

  async create(input: SignUpDto): Promise<IUser> {
    const user = new UserDto();
    user.userId = uuid.v4();
    user.username = input.username;
    user.password = input.password;
    user.role = input.role;

    const newUser = await this.userModel.create(user);
    await newUser.save();
    return this.sanitizeUser(newUser);
  }

  sanitizeUser(user: IUser) {
    const sanitized = user.toObject();
    delete sanitized['password'];
    return sanitized;
  }
}
