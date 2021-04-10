import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { extractTokenFromAuthHeader } from 'utils';
import { AuthConstants } from 'common/constants/authConstants';

@Injectable()
export class RestAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    try {
      const request = context.switchToHttp().getRequest();
      if (!request) {
        throw new Error('Unauthorized request');
      }
      const extractedToken = extractTokenFromAuthHeader(
        request.headers,
        AuthConstants.AUTH_HTTP_REQUEST_HEADER,
      );

      await this.jwtService.verify(extractedToken.value);
      const decodedToken = await this.jwtService.decode(extractedToken.value);

      request.user = decodedToken;

      return true;
    } catch (err) {
      throw new Error('Unauthorized request');
    }
  }
}
