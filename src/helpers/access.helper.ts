import { prepareArray } from '../decorators';
import { AccessPermissionInterface, KeycloakTokenInterface } from '../models';

export class AccessHelper {
  /**
   * Функция проверяет наличие ролей у пользователя
   * @param parsedToken Распаршеный Keycloak token
   * @param client id клиента в keycloak
   * @param role id роли в keycloak
   */
  static containRole(
    parsedToken: KeycloakTokenInterface,
    client: string,
    role: string
  ) {
    return (
      parsedToken &&
      parsedToken.resource_access &&
      parsedToken.resource_access[client] &&
      parsedToken.resource_access[client].roles instanceof Array &&
      parsedToken.resource_access[client].roles.indexOf(role) >= 0
    );
  }

  static checkPermissions(
    token: KeycloakTokenInterface,
    permissions: AccessPermissionInterface[]
  ) {
    const isAccess = prepareArray(permissions).reduce(
      (result: boolean, perm: AccessPermissionInterface) =>
        result ||
        AccessHelper.containRole(token, perm.accessClient, perm.accessRole),
      false // начальное значение
    );
    return isAccess;
  }
}
