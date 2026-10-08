function isString(value: any): value is string {
  return typeof value === 'string';
}
function printLength(value: string | number) {
  if (isString(value)) {
    console.log(value.length); // Works safely only if it's a string
  } else {
    console.log(value); // It's a number
  }
}

export { isString, printLength };
