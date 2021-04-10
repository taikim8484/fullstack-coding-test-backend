import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { BlogsEntity } from 'entities';
import EventEmitter from 'events';

import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  SimpleConsoleLogger,
} from 'typeorm';

@EventSubscriber()
export class BlogsSubscriber implements EntitySubscriberInterface<BlogsEntity> {
  public static emitter: EventEmitter;
  constructor() {
    if (!BlogsSubscriber.emitter) {
      BlogsSubscriber.emitter = new EventEmitter();
    }
  }
  listenTo() {
    return BlogsEntity;
  }
  async afterInsert(event: InsertEvent<any>) {
    BlogsSubscriber.emitter.emit('afterInsert', event.entity);
  }
}
