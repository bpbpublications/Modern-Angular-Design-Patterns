function Logger(constructor: Function) {
  console.log(`Class ${constructor.name} has been initialized.`);
}
@Logger
class User {
  constructor() {
    console.log('User instance created.');
  }
}

export { User };
