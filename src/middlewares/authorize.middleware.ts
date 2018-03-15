import { TokenExtractor, TokenInterface } from '../models';
import { parseAuthHeader } from '../utils';

/**
 * Options for create authorize middleware
 */
export interface AuthorizeMiddlewareOptions {
  tokenExtractor: TokenExtractor;
  checkRoleFn?: CheckRoleFn;
}

export type CheckRoleFn = (token: TokenInterface) => boolean;

/**
 * Create check roles in token function
 * @param options must contain token extractor instance
 */
export function authorizeMiddlewareFactory(
  options: AuthorizeMiddlewareOptions
) {
  return authorizeMiddleware;

  async function authorizeMiddleware(authHeader: string): Promise<boolean> {
    let authorized = false;
    const token = parseAuthHeader(authHeader);
    const parsedToken = await options.tokenExtractor.extractToken(token);
    if (typeof options.checkRoleFn !== 'function') {
      return true;
    }
    return options.checkRoleFn(parsedToken);
  }
}