import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';


export class policyDto {
    policyId: string;

    @ApiProperty({required: true})
    @Column({ length: 25 })
    company:string;

    @ApiProperty({required: true})
    @Column({ length: 25 })
    coverage:string;

    @ApiProperty({required: true,  example: "standard | zero-cost"})
    @Column()
    policyType: string;

    @ApiProperty()
    @Column() 
    maxAge: string;

    @ApiProperty()
    @Column() 
    premium: string; 
}