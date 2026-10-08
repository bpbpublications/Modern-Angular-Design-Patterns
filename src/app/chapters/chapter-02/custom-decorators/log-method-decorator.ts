function LogMethod(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log(`Calling method: ${propertyKey} with arguments:`, args);
    return originalMethod.apply(this, args);
  };
  return descriptor;
}
class Calculator {
  @LogMethod
  add(a: number, b: number): number {
    return a + b;
  }
}

export { Calculator };
