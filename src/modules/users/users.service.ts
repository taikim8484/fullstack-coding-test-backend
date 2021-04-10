import { Injectable } from '@nestjs/common';
import { UserRoles } from 'common/constants/authConstants';
import { ReposService } from 'modules/repos/repos.service';

@Injectable()
export class UsersService {
  constructor(private readonly reposService: ReposService) {}

  public async createUser(params: {
    email: Email;
    fid: FirebaseUID;
    name: string;
    dateOfBirth: Date;
    role: UserRoles;
  }) {
    return this.reposService.usersRepo.create(params);
  }

  public async getUserProfileByFirebaseId(fid: FirebaseUID) {
    return this.reposService.usersRepo.findOne({ fid });
  }

  public async saveUser(
    id: number,
    params: { name: string; dateOfBirth: Date },
  ) {
    return this.reposService.usersRepo.update({ id }, params);
  }
}
