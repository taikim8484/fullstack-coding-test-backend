import { Module } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { ReposModule } from 'modules/repos/repos.module';
import { AuthModule } from 'modules/auth/auth.module';
import { RestAuthGuard } from 'guard/rest.auth.guard';

@Module({
  imports: [ReposModule, AuthModule],
  controllers: [BlogsController],
  providers: [BlogsService, RestAuthGuard],
})
export class BlogsModule {}
