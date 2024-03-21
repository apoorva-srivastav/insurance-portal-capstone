import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';

export class User {
    userId: string;

    @ApiProperty({required: true})
    password:string;

    @ApiProperty({required: true})
    username:string;

    @ApiProperty({required: true,  enum: ["admin , user"]})
    role: string;

    @ApiProperty({example: 29})
    age: number;
}


export class loginDto {
    @ApiProperty({required: true})
    password:string;

    @ApiProperty({required: true})
    username:string;
}

export class loginResponseDto {
    @ApiProperty()
    @Column()
    token:string;
}

export class signUpResponseDto {
    @ApiProperty()
    userId: string;

    @ApiProperty({required: true})
    password:string;

    @ApiProperty({required: true})
    username:string;

    @ApiProperty({required: true,  enum: ["admin , user"]})
    role: string;

    @ApiProperty({example: 29})
    age: number;
}