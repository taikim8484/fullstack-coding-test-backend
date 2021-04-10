import { AuthConstants } from 'common/constants/authConstants';

const parseAuthHeader = hdrValue => {
  if (typeof hdrValue !== 'string') {
    return null;
  }
  const matches = hdrValue.match(AuthConstants.AUTH_HEADER_REGEX);
  return matches && { scheme: matches[1], value: matches[2] };
};

export const extractTokenFromAuthHeader = (headers, tokenType) => {
  const authHeader = headers[tokenType];
  const tokenParams = parseAuthHeader(authHeader);

  if (!tokenParams || tokenParams.scheme !== AuthConstants.AUTH_HEADER_BEARER) {
    throw new Error(`Can not read token from headers`);
  }
  return tokenParams;
};
