import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogsEntity, UsersEntity } from 'entities';
import { FirebaseFirestoreService } from '@aginix/nestjs-firebase-admin';
import { Repository } from 'typeorm';
import { BlogsSubscriber } from 'subscribers/blogs.subscriber';

@Injectable()
export class ReposService {
  constructor(
    @InjectRepository(BlogsEntity)
    public readonly blogsRepo: Repository<BlogsEntity>,
    @InjectRepository(UsersEntity)
    public readonly usersRepo: Repository<UsersEntity>,
    private readonly firebaseFirestoreService: FirebaseFirestoreService,
  ) {
    BlogsSubscriber.emitter.on('afterInsert', async event => {
      await this.firebaseFirestoreService.collection('blogs').add(event);
    });
  }
}
