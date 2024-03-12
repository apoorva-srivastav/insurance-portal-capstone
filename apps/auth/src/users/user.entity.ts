import { Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity()
export class UserDto {
  @ObjectIdColumn()
  userId: string;
  @Column()
  username: string;
  @Column()
  password: string;
}
