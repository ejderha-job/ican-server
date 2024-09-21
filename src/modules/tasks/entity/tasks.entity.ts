import {Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Users} from "../../users/entity/users.entity";
import {taskDTO} from "../dto/tasks.dto";
import { Subcategories } from "src/modules/subcategories/entity/subcategories.entity";

@Entity()
export class Tasks {
    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(()=>Users, (Users)=>Users.tasks, {onDelete:"CASCADE"})
    user: Users;
    @ManyToMany(()=>Subcategories,(subcategory)=>subcategory.tasks)
    Subcategory: Subcategories
    @Column("simple-json")
    props: taskDTO
    @ManyToMany(()=>Users, (users) => users.tasksWhereImExecuter)
    executers: Users[]
}