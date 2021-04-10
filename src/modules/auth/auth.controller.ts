import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FirebaseAuthenticationService } from '@aginix/nestjs-firebase-admin';
import { UsersService } from 'modules/users/users.service';
import { UserRoles } from 'common/constants/authConstants';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly firebaseAuthenticationService: FirebaseAuthenticationService,
    private readonly usersSerivce: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('sign-up')
  async signUp(@Body() body) {
    const { idToken, name, dateOfBirth } = body;
    const firebaseUser = await this.firebaseAuthenticationService.verifyIdToken(
      idToken,
    );

    await this.usersSerivce.createUser({
      email: firebaseUser.email,
      fid: firebaseUser.uid,
      name,
      dateOfBirth,
      role: UserRoles.NORMAL,
    });

    return {
      message: 'Registed successfully',
      status: HttpStatus.OK,
    };
  }

  @Post('sign-in')
  async signIn(@Body() body) {
    const { idToken } = body;
    const firebaseUser = await this.firebaseAuthenticationService.verifyIdToken(
      idToken,
    );

    let userProfile = await this.usersSerivce.getUserProfileByFirebaseId(
      firebaseUser.uid,
    );
    if (!userProfile) {
      userProfile = await this.usersSerivce.createUser({
        email: firebaseUser.email,
        fid: firebaseUser.uid,
        name: 'Coding Test User',
        dateOfBirth: new Date(),
        role: UserRoles.NORMAL,
      });
    }

    const accessToken = this.jwtService.sign(JSON.stringify(userProfile));
    return {
      accessToken,
      message: 'Login successfully',
      status: HttpStatus.OK,
    };
  }

  @Post('sign-out')
  async signOut() {
    // TODO: black list access token
    return {
      message: 'Logout successfully',
      status: HttpStatus.OK,
    };
  }
}
