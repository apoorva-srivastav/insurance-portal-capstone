import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    userId: string;

    @Column({ length: 25 })
    password:string;

    @Column({ length: 25 })
    username:string;

    @Column()
    role: string;

    @Column() 
    age: string;
}
