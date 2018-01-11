import { Action } from 'routing-controllers';

import { KeycloakTokenExtractor } from '../token-extractor';
import { parseAuthHeader } from '../utils';

export interface AuthorizeMiddlewareOptions {
  tokenExtractor: KeycloakTokenExtractor;
  checkRoleFn: CheckRoleFn;
}

export type CheckRoleFn = (token: any) => boolean;

export function authorizeMiddlewareFactory(
  options: AuthorizeMiddlewareOptions
) {
  return authorizeMiddleware;

  async function authorizeMiddleware(
    action: Action,
    checkRoleFn: CheckRoleFn
  ): Promise<boolean> {
    let authorized = false;
    const authHeader = action.request.headers['authorization'];
    const token = parseAuthHeader(authHeader);
    const parsedToken = await options.tokenExtractor.extractToken(token);
    return checkRoleFn(parsedToken);
  }
}
