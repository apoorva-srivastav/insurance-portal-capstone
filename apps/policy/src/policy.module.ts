import { Module } from '@nestjs/common';
import { PolicyController } from './policy.controller';
import { PolicyService } from './policy.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PolicySchema } from './schema/policy.schema';
import { UserSchema } from 'apps/auth/src/schema/user.schema';

@Module({
  imports: [MongooseModule.forRoot(
    'mongodb+srv://Test123:Test123@testcluster.xaqjodo.mongodb.net/',
    { dbName: 'policy' },
  ),
  MongooseModule.forFeature([{ name: 'Policy', schema: PolicySchema }])
  ],
  controllers: [PolicyController],
  providers: [PolicyService],
})
export class PolicyModule {}
