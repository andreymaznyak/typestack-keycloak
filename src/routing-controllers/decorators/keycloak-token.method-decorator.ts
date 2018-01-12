import { createParamDecorator } from 'routing-controllers';

import { KeycloakTokenInterface } from '../../models';

/**
 * Decorator fetch decoded user token from contecxt, use it before put
 * parsed token to context
 * @param options
 */
export function KeycloakToken(options?: { required?: boolean }) {
  return createParamDecorator({
    required: options && options.required ? true : false,
    value: action => {
      const token: KeycloakTokenInterface =
        action.context['decoded-user-token'];
      if (!token) {
        throw new Error('empty token, on KeycloakToken decorator');
      }
      return token;
    }
  });
}
