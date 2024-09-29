import { Module } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersController } from '../controller/users.controller';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserEntity } from 'src/typeorm/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), JwtModule.registerAsync({
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get("JWT_SECRET"),
      signOptions: { expiresIn: '600s' }
    }),
    inject: [ConfigService],
  }),],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule { }
