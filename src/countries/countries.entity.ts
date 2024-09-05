import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Countries {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    title:string
}