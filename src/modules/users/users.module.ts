import { Module } from '@nestjs/common';
import { ReposModule } from 'modules/repos/repos.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [ReposModule],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
