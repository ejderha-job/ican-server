import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CountriesModule } from './components/countries/module/countries.module';
import { CategoriesModule } from './components/categories/module/categories.module';
import { TasksModule } from './components/tasks/module/tasks.module';
import { AuthModule } from './components/auth/module/auth.module';
import { UsersModule } from './components/users/module/users.module';
import { SubcategoriesModule } from './components/subcategories/module/subcategories.module';
import { MailModule } from './components/mail/modules/mail.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRootAsync({
            useFactory: async (configService: ConfigService) => ({
                type: 'postgres',
                autoLoadEntities:true,
                username: configService.get("POSTGRES_USERNAME"),
                password: configService.get("POSTGRES_PASSWORD"),
                database: configService.get("POSTGRES_DATABASE"),
                port: 5432,
                entities: ["**/*.entity{ .ts,.js}"],
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
