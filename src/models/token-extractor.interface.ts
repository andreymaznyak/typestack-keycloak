import { TokenInterface } from './token.interface';


export type extractTokenFn = (token: string) => Promise<TokenInterface>;
export type verifyTokenFn = (token: string, ...args: any[]) => Promise<boolean>;
export interface TokenExtractor {
  extractToken: extractTokenFn;
  verifyToken: verifyTokenFn;
}
