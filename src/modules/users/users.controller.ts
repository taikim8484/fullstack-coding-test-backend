import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { RestAuthGuard } from 'guard/rest.auth.guard';
import { UsersService } from './users.service';

@UseGuards(RestAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Put('profiles')
  public async updateUserProfiles(@Body() body, @Request() request) {
    const { name, dateOfBirth } = body;
    const { id } = request.user;
    await this.usersService.saveUser(id, { name, dateOfBirth });
    return {
      message: 'Create user profiles successfully',
      status: HttpStatus.OK,
    };
  }

  @Get('me')
  public async getMeProfile(@Request() request) {
    const { fid } = request.user;
    const user = await this.usersService.getUserProfileByFirebaseId(fid);
    return {
      user: {
        ...request.user,
        ...user,
      },
    };
  }
}
