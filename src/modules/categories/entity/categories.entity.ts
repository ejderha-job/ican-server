import { Subcategories } from "src/modules/subcategories/entity/subcategories.entity";
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Categories {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @OneToMany(()=>Subcategories, (subcategories)=>subcategories.category)
    subcategories: Subcategories[]
}