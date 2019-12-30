export function isFunction(value) {
  return (
    value &&
    (Object.prototype.toString.call(value) === '[object Function]' ||
      'function' === typeof value ||
      value instanceof Function)
  );
}

export function required(attributeName) {
  throw Error(`${attributeName} is a required parameter`);
}
