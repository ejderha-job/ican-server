import {Tasks} from "../../tasks/entity/tasks.entity";

export class CategoriesDto {
    name: string;
    tasks?: Tasks[]
}