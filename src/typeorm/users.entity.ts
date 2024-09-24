import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TasksEntity } from "./tasks.entity";

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn("uuid")
    id: number
    @Column({ nullable: true })
    fio: string
    @Column({ nullable: true })
    avatar: string
    @Column()
    login: string
    @Column({ nullable: true })
    password: string
    @OneToMany(() => TasksEntity, Tasks => Tasks.user, { onDelete: "CASCADE" })
    tasks: Array<TasksEntity>;
    @ManyToMany(() => TasksEntity, (tasks) => tasks.executers)
    tasksWhereImExecuter: TasksEntity[]
}