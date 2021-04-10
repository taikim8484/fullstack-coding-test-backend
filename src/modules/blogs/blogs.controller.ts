import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserRoles } from 'common/constants/authConstants';
import { Roles } from 'decorators/roles.decorators';
import { RestAuthGuard } from 'guard/rest.auth.guard';
import { RoleGuard } from 'guard/role.guard';
import { BlogsService } from './blogs.service';

@UseGuards(RestAuthGuard, RoleGuard)
@Controller('resources')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Roles(UserRoles.ADMIN)
  @Post('blogs')
  public async createBlog(@Body() body, @Request() request) {
    const { img, title, content } = body;
    const { id } = request.user;
    await this.blogsService.createBlog({
      author: id,
      img,
      title,
      content,
    });
    return {
      message: 'Blog created successfully!',
      status: HttpStatus.OK,
    };
  }

  @Get('blogs')
  public async getBlogs() {
    const blogs = await this.blogsService.getBlogs();
    return {
      data: blogs,
      message: 'Get blogs successfully!',
      status: HttpStatus.OK,
    };
  }

  @Roles(UserRoles.ADMIN)
  @Put('blogs')
  public async updateBlog(@Body() body) {
    const { id, ...params } = body;
    await this.blogsService.updateBlog(id, params);
    return {
      messsage: 'Blog updated successfully!',
      status: HttpStatus.OK,
    };
  }

  @Roles(UserRoles.ADMIN)
  @Delete('blogs')
  public async deleteBlog(@Body() body) {
    const { id } = body;
    await this.blogsService.deleteBlog(id);
    return {
      messsage: 'Blog deleted successfully!',
      status: HttpStatus.OK,
    };
  }
}
