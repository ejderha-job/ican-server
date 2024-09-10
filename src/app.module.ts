import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CountriesModule } from './modules/countries/countries.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { SubcategoriesModule } from './modules/subcategories/subcategories.module';
import { MailModule } from './modules/mail/mail.module';

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
        MailModule
    ]
})
export class AppModule {
}
