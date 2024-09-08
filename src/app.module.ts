import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { CountriesModule } from './countries/countries.module';
import { CategoriesModule } from './categories/categories.module';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { dataSource } from "./db/ormconfig";
import { SubcategoriesModule } from './subcategories/subcategories.module';
import { MailModule } from './mail/mail.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                type: 'postgres',
                // host: 'db',
                username: configService.get("POSTGRES_USERNAME"),
                password: configService.get("POSTGRES_PASSWORD"),
                database: configService.get("POSTGRES_DATABASE"),
                port: 5432,
                entities: ["**/*.entity{ .ts,.js}"],
                synchronize: true,
                // @ts-ignore
                seeds: ['src/seeds/**/*{.ts,.js}'],
                factories: ['src/factories/**/*{.ts,.js}'],
            }),
            inject: [ConfigService]
        }),
        CountriesModule,
        CategoriesModule,
        TasksModule,
        AuthModule,
        UsersModule,
        SubcategoriesModule,
        MailModule,
    ]
})
export class AppModule {
}
