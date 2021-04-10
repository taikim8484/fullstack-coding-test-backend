import { Injectable } from '@nestjs/common';
import { ReposService } from 'modules/repos/repos.service';

@Injectable()
export class BlogsService {
  constructor(private readonly reposService: ReposService) {}
  public async createBlog(params: {
    author: string;
    title: string;
    content: string;
    img: ImgUrl;
  }) {
    this.reposService.blogsRepo.save(params);
  }
  public async getBlogs() {
    return this.reposService.blogsRepo.find({});
  }
  public async updateBlog(params, id) {
    return this.reposService.blogsRepo.update({ id }, params);
  }
  public async deleteBlog(id) {
    return this.reposService.blogsRepo.delete({ id });
  }
}
