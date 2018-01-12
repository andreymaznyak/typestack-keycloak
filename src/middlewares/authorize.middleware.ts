import { KeycloakTokenExtractor } from '../token-extractor';
import { parseAuthHeader } from '../utils';

export interface AuthorizeMiddlewareOptions {
  tokenExtractor: KeycloakTokenExtractor;
  checkRoleFn: CheckRoleFn;
}

export type CheckRoleFn = (token: any) => boolean;

/**
 * Create check roles in token function
 * @param options must contain token extractor instance
 */
export function authorizeMiddlewareFactory(
  options: AuthorizeMiddlewareOptions
) {
  return authorizeMiddleware;

  async function authorizeMiddleware(
    authHeader: string,
    checkRoleFn: CheckRoleFn
  ): Promise<boolean> {
    let authorized = false;
    const token = parseAuthHeader(authHeader);
    const parsedToken = await options.tokenExtractor.extractToken(token);
    return checkRoleFn(parsedToken);
  }
}
