import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogsEntity, UsersEntity } from 'entities';
import { ReposService } from './repos.service';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity, BlogsEntity])],
  providers: [ReposService],
  exports: [ReposService],
})
export class ReposModule {}
