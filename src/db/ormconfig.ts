import {DataSource, DataSourceOptions} from "typeorm";

export const dataSource:DataSourceOptions = {
    type:'postgres',
    // host: 'db',
    username: 'postgres',
    password: 'postgres',
    database: 'postgres',
    port: 5432,
    entities: ["**/*.entity{ .ts,.js}"],
    synchronize: true,
    // @ts-ignore
    seeds: ['src/seeds/**/*{.ts,.js}'],
    factories: ['src/factories/**/*{.ts,.js}'],
}

export default dataSource
// export default new DataSource(dataSource)
