import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { UsersEntity, BlogsEntity } from 'entities';
import { TYPE_ORM } from 'environments';

@Injectable()
export class TypeOrmService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    const options: TypeOrmModuleOptions = {
      ...TYPE_ORM.postgreSQL,
      entities: [UsersEntity, BlogsEntity],
      keepConnectionAlive: true,
    };
    return options;
  }
}
