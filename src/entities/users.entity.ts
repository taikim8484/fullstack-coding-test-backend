import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserRoles } from 'common/constants/authConstants';

@Entity()
export default class Users {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  fid: string;

  @Column()
  name: string;

  @Column()
  dateOfBirth: Date;

  @Column()
  role: UserRoles;
}
