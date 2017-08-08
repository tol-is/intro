/*
 * Replacer
 * replaces type function props to readable function string
 */
export function replacer(key, value) {
  if (typeof value === 'function') {
    return `function ${value.name}() {...}`;
  }
  return value;
}

/*
 * Stringify
 * Stringifies JSON with function replaces
 */
export function stringify(value) {
  return JSON.stringify(value, replacer, 2);
}
