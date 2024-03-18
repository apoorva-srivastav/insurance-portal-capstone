import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "root",
    "password": "Mysqldb@1",
    "database": "auth_nest",
    "entities": [User],
    "synchronize": true
  }),
  TypeOrmModule.forFeature([User])
],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
