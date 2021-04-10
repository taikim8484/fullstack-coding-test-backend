import { Module } from '@nestjs/common';
import { UsersModule } from 'modules/users/users.module';
import { UsersService } from 'modules/users/users.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';

@Module({
  imports: [UsersModule, JwtModule.register({})],
  controllers: [AuthController],
})
export class AuthModule {}
