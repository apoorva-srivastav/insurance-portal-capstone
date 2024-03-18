import { Module } from '@nestjs/common';
import { PolicyController } from './policy.controller';
import { PolicyService } from './policy.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PolicySchema } from './schema/policy.schema';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [MongooseModule.forRoot(
    'mongodb+srv://Test123:Test123@testcluster.xaqjodo.mongodb.net/',
    { dbName: 'policy' },
  ),
  MongooseModule.forFeature([{ name: 'Policy', schema: PolicySchema }]),
  ThrottlerModule.forRoot([{
    ttl: 5,
    limit: 2,
  }])
  ],
  controllers: [PolicyController],
  providers: [PolicyService],
})
export class PolicyModule {}
