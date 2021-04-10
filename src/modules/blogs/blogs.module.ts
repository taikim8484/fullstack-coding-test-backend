import { Module } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { ReposModule } from 'modules/repos/repos.module';

@Module({
  imports: [ReposModule],
  providers: [BlogsService],
  controllers: [BlogsController],
})
export class BlogsModule {}
