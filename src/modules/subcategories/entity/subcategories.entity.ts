import { Categories } from "src/modules/categories/entity/categories.entity";
import { Tasks } from "src/modules/tasks/entity/tasks.entity";
import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Subcategories {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    title:string
    @ManyToOne(()=>Categories, (category)=>category.subcategories)
    category: Categories
    @OneToMany(() => Tasks, (task)=>task.Subcategory)
    tasks: Tasks[]
}