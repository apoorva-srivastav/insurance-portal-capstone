import { Module } from '@nestjs/common';
import { PolicyController } from './policy.controller';
import { PolicyService } from './policy.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PolicySchema } from './schema/policy.schema';
import { LoggerModule } from '../../../libs/common/src/logger/logger.module';

@Module({
  imports: [MongooseModule.forRoot(
  'mongodb+srv://Test123:Test123@testcluster.xaqjodo.mongodb.net/',
    { dbName: 'policy' },
  ),
  MongooseModule.forFeature([{ name: 'Policy', schema: PolicySchema }]),
  LoggerModule
  ],
  controllers: [PolicyController],
  providers: [PolicyService],
})
export class PolicyModule {}
