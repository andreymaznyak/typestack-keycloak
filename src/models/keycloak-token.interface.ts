import { TokenInterface } from './token.interface';

export interface KeycloakTokenInterface extends TokenInterface {
  sub: string; // user id
}
