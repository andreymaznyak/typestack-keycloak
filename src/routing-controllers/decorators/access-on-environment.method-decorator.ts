import { getMetadataArgsStorage } from 'routing-controllers';

/**
 * С помощью данного декоратора можно отключать endpoint`ы в зависимости от
 * переменной окружения NODE_ENV
 * @param environments Массив разрешенных значений NODE_ENV
 */
export function AccessOnEnvironment(environments: string[]) {
  const nodeEnv = process.env.NODE_ENV;
  if (environments.indexOf(nodeEnv) < 0) {
    return function(
      target: Object,
      propertyKey: string,
      descriptor: TypedPropertyDescriptor<any>
    ): void {
      const controllerName = target.constructor
        .toString()
        .match(/class (\w+)?/)[1];
      getMetadataArgsStorage().responseHandlers.push({
        type: 'on-null',
        target: target.constructor,
        method: propertyKey,
        value: 405
      });
      descriptor.value = function(): null {
        return null;
      };
    };
  } else {
    return function(
      target: Object,
      propertyKey: string | symbol,
      descriptor: TypedPropertyDescriptor<any>
      // tslint:disable-next-line:no-empty
    ): void {};
  }
}
