import { forwardRef, Module } from '@nestjs/common';
import { UsersModule } from 'modules/users/users.module';
import { UsersService } from 'modules/users/users.service';
import { AuthController } from './auth.controller';
import { RestAuthGuard } from 'guard/rest.auth.guard';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: 'jwt-secret',
    }),
  ],
  controllers: [AuthController],
  providers: [RestAuthGuard],
  exports: [RestAuthGuard, JwtModule],
})
export class AuthModule {}
