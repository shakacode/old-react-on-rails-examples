// @flow

export function toArray(value: any) {
  return Array.isArray(value) ? value : [value];
}
