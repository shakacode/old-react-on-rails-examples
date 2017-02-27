// @flow

export function isObject(subject: any) {
  return typeof subject === 'object' && Object.prototype.toString.call(subject) === '[object Object]';
}

export function toArray(value: any) {
  return Array.isArray(value) ? value : [value];
}
