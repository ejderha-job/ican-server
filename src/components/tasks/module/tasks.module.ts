import { forwardRef, Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsersModule} from "../../users/module/users.module";
import { TasksEntity } from 'src/typeorm/tasks.entity';
import { SubcategoriesModule } from 'src/components/subcategories/module/subcategories.module';
import { TasksService } from '../service/tasks.service';
import { TasksController } from '../controller/tasks.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { IsAuth } from 'src/guard/isAuth';

@Module({
    imports: [ 
        forwardRef(() => UsersModule),
        TypeOrmModule.forFeature([TasksEntity]), 
        SubcategoriesModule,  
        JwtModule.registerAsync({
        useFactory: async (configService: ConfigService) => ({
            secret: configService.get("JWT_SECRET"),
            signOptions: { expiresIn: '600s' }
        }),
        inject: [ConfigService],
    }),],
    providers:[TasksService, IsAuth],
    controllers:[TasksController],
    exports: [TasksService]
})
export class TasksModule {

}
