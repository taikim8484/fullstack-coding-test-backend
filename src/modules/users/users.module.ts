import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from 'modules/auth/auth.module';
import { ReposModule } from 'modules/repos/repos.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [ReposModule, forwardRef(() => AuthModule)],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
