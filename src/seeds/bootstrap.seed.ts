import {Factory, Seeder} from "typeorm-seeding";
import {Countries} from "../modules/countries/entity/countries.entity";
import { Users } from "src/modules/users/users.entity";
import { Tasks } from "src/modules/tasks/entity/tasks.entity";
import { Categories } from "src/modules/categories/entity/categories.entity";
import { Subcategories } from "src/modules/subcategories/entity/subcategories.entity";

const items = [
    {
        title: "Курьерские услуги",
        subcategories: [
            "Услуги пешего курьера",
            "Услуги курьера на легковом авто", "Купить и доставить", "Другая посылка"]
    },
    {
        title: "Репетиторы и обучение",
        subcategories: [
            "Русский язык и литература",
            "Английский язык",
            "Французский язык",
            "Немецкий язык",
            "Испанский язык",
            "Другие иностранные языки"
        ]
    },
    {
        title: "Уборка и помощь по хозяйству",
        subcategories: []
    },
    {
        title: "Ремонт и строительство",
        subcategories: [
            "Мастер на час",
            "Ремонт под ключ",
            "Сантехнические работы",
            "Электромонтажные работы",
            "Отделочные работы",
            "Потолки",
            "Полы"
        ]
    },
    {
        title: "Красота и здоровье",
        subcategories: ["Услуги косметолога",
            "Эпиляция",
            "Брови и ресницы",
            "Услуги визажиста",
            "Тату и пирсинг"]
    },
    {
        title: "Компьютерная помощь",
        subcategories: ["Ремонт компьютеров и ноутбуков", "Установка и настройка операц. систем, программ", "Удаление вирусов"]
    },
    {
        title: "Дизайн",
        subcategories: ["Фирменный стиль, логотипы, визитки", "Дизайн сайтов и приложений"]
    }
]

export default class CreateCategories implements Seeder {
    public async run(factory: Factory): Promise<any> {
        const user = await factory(Users)().create({tasks:[]})
        await factory(Countries)().createMany(10)
        await Promise.all(items.map(async item => {
            const NewCategory = await factory(Categories)().create({subcategories:[], name:item.title})
            await Promise.all(item.subcategories.map(async subitem => {
                const NewSubcategory = await factory(Subcategories)().create({title:subitem, category:NewCategory, tasks:[]})
                const NewTask = await factory(Tasks)().create({Subcategory:NewSubcategory, user})
            }))
        }))
    }
}