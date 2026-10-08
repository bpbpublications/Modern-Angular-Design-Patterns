import { Injectable } from '@angular/core';
import { Command } from './command';

@Injectable({
  providedIn: 'root'
})
export class CommandService {
  private history: Command[] = [];
  executeCommand(command: Command) {
    command.execute();
    this.history.push(command);
  }
  undoLastCommand() {
    const command = this.history.pop();
    if (command) {
      command.undo();
    }
  }
}
