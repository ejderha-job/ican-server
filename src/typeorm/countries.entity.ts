import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CountryEntity {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number
    @ApiProperty()
    @Column()
    title: string
}