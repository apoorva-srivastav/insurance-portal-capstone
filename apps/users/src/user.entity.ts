import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    userId: string;

    @Column()
    password:string;

    @Column({ length: 25 })
    username:string;

    @Column()
    role: string;

    @Column() 
    age: string;

}
