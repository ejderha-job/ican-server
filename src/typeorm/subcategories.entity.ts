import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { CategoryEntity } from "./categories.entity";
import { TasksEntity } from "./tasks.entity";

@Entity()
export class SubcategoryEntity {
    @PrimaryGeneratedColumn("uuid")
    id: number
    @Column()
    title:string
    @ManyToOne(()=>CategoryEntity, (category)=>category.subcategories)
    category: CategoryEntity
    @OneToMany(() => TasksEntity, (task)=>task.Subcategory)
    tasks: TasksEntity[]
}