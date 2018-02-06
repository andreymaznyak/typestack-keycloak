import { ClientAccessInterface } from './client-access.interface';
import { TokenInterface } from './token.interface';

export interface KeycloakTokenInterface extends TokenInterface {
  sub: string; // user id
  resource_access: { [key: string]: ClientAccessInterface };
  family_name: string;
  given_name: string;
  name: string;
  preferred_username: string;
  realm_access: { roles: string[] };
}
