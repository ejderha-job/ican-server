import {Tasks} from "../../tasks/tasks.entity";

export class CategoriesDto {
    name: string;
    tasks?: Tasks[]
}