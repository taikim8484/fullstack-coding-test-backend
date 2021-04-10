import {
  Body,
  Controller,
  HttpStatus,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';

// @UseGuards(RestAuthGuard)
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
}
