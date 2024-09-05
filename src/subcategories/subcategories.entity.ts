import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Categories} from "../categories/categories.entity";
import {Tasks} from "../tasks/tasks.entity";

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