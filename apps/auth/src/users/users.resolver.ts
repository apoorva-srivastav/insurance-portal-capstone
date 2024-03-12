import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UserDto } from './user.entity';
import { UserInputDto } from './user.input';

@Resolver('User')
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @Query(() => String)
  async hello() {
    return await 'world';
  }

  @Query(() => [UserDto])
  async users() {
    return this.userService.findAll();
  }

  @Mutation(() => UserDto)
  async createUser(@Args('input') input: UserInputDto) {
    return await this.userService.create(input);
  }
}
