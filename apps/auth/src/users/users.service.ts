import { Injectable } from '@nestjs/common';
import { UserInputDto } from './user.input';
import { UserDto } from './user.entity';
import * as uuid from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from '../interface/user.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<IUser>,
  ) {}

  async findAll(): Promise<UserDto[]> {
    return this.userModel.find();
  }

  async findOneUser(username: string): Promise<UserDto> {
    return this.userModel.findOne({ username });
  }

  async create(input: UserInputDto): Promise<UserDto> {
    const user = new UserDto();
    user.userId = uuid.v4();
    user.username = input.username;
    user.password = input.password;
    const newUser = await this.userModel.create(user);
    return newUser.save();
  }
}
