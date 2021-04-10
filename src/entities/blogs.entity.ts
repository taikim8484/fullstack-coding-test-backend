import { AfterInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Blogs {
  // private static _emitter: EventEmitter;

  // constructor() {
  //   if (!Blogs._emitter) {
  //     Blogs._emitter = new EventEmitter();
  //   }
  // }

  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  img: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  author: string;

  @AfterInsert()
  async afterInsert(a) {
    console.log(a, 'awdawdaw');
  }
}
