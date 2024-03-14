import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';

import { JwtStrategy } from './strategy/jwt.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from './users/users.module';
import { jwtConstants } from './constants';
import { LoggerModule } from '../../../libs/common/src/logger/logger.module';
  
@Module({
  imports: [
  UsersModule,
    PassportModule,
    AuthModule,
    LoggerModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '20s' },
    }),
    MongooseModule.forRoot(
      'mongodb+srv://Test123:Test123@testcluster.xaqjodo.mongodb.net/',
      { dbName: 'auth' },
    )
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
