interface Command {
  execute(): void;
  undo(): void;
}
class Light {
  turnOn() {
    console.log('Light is ON');
  }

  turnOff() {
    console.log('Light is OFF');
  }
}
class LightOnCommand implements Command {
  constructor(private light: Light) {}
  execute() {
    this.light.turnOn();
  }
  undo() {
    this.light.turnOff();
  }
}
class LightOffCommand implements Command {
  constructor(private light: Light) {}
  execute() {
    this.light.turnOff();
  }
  undo() {
    this.light.turnOn();
  }
}

export { Light, LightOnCommand, LightOffCommand };
