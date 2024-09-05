import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Subcategories} from "../subcategories/subcategories.entity";

@Entity()
export class Categories {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @OneToMany(()=>Subcategories, (subcategories)=>subcategories.category)
    subcategories: Subcategories[]
}