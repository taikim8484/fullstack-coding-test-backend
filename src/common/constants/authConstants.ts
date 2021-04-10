export class AuthConstants {
  public static readonly AUTH_HTTP_REQUEST_HEADER = 'authorization';
  public static readonly AUTH_HEADER_BEARER = 'Bearer';
  public static readonly AUTH_HEADER_REGEX = /(\S+)\s+(\S+)/;
}

export enum UserRoles {
  NORMAL = 'NORMAL',
  ADMIN = 'ADMIN',
}
