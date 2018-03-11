export function ConvertToArray() {
  return function(
    target: any,
    propertyKey: string | symbol,
    parameterIndex: number
  ) {
    const fn = target[propertyKey];
    target[propertyKey] = function(...args: any[]) {
      args[parameterIndex] = prepareArray(args[parameterIndex]);
      return fn(...args);
    };
  };
}

export function prepareArray(options: any | any[]): any[] {
  return options instanceof Array ? [...options] : [options];
}
