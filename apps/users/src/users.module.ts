import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { LoggerModule } from '../../../libs/common/src/logger/logger.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: "mysql",
    host:  "localhost",//"host.docker.internal",
    port: 3306,
    username: "root",
    password: "Mysqldb@1",
    database: "auth_nest",
    entities: [User],
    synchronize: true,
    logging: "all",
    logger: "debug"
  }),
  // ConfigModule.forRoot({
  //   isGlobal: true,
  //   validationSchema: Joi.object({
  //     MONGODB_URI: Joi.string().required(),
  //     JWT_SECRET: Joi.string().required(),
  //     JWT_EXPIRATION: Joi.string().required(),
  //     HTTP_PORT: Joi.number().required(),
  //     TCP_PORT: Joi.number().required(),
  //   }),
  // })
  TypeOrmModule.forFeature([User]),
    LoggerModule
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule { }
