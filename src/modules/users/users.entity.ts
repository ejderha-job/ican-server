import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Tasks} from "../tasks/entity/tasks.entity";

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    login: string
    @Column()
    password: string
    @OneToMany(()=>Tasks, Tasks => Tasks.user)
    tasks: Array<Tasks>;
}