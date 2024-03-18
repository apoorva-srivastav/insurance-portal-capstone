import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';

import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { ClientProxy } from '@nestjs/microservices';
import { User } from '../dto/user.entity';
import { Role, Roles } from '../decorators/roles.decorator';
import { AuthGuard } from '../gaurds/auth.guard';
import { RolesGuard } from '../gaurds/role.gaurd';
import { Authorization } from '../decorators/authorization.decorator';

@Controller()
export class PolicyController {
  constructor(
    @Inject('POLICY_SERVICE') private readonly policyServiceClient: ClientProxy,) {}

  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Authorization(true)
  @Post('/add-policy')
  addNewPolicy(@Body() body: Record<string, any>) {
    return this.policyServiceClient.send('add_new_policy', body);
  }

  @Get('/all-policies')
  getPolicies() {
    return this.policyServiceClient.send('get_all_policies', {});
  }
  

}
