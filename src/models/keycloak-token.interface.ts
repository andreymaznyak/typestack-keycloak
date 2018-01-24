import { ClientAccessInterface } from './client-access.interface';
import { TokenInterface } from './token.interface';

export interface KeycloakTokenInterface extends TokenInterface {
  sub: string; // user id
  resource_access: { [key: string]: ClientAccessInterface };
}
