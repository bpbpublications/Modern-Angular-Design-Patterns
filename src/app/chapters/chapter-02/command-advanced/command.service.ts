import { Injectable } from '@angular/core';
import { Command } from '../command/command';

@Injectable({
  providedIn: 'root'
})
export class CommandService {
  private undoStack: Command[] = [];
  private redoStack: Command[] = [];
  execute(command: Command) {
    command.execute();
    this.undoStack.push(command);
    this.redoStack = []; // Clear redo history
  }
  undo() {
    const command = this.undoStack.pop();
    if (command) {
      command.undo();
      this.redoStack.push(command);
    }
  }
  redo() {
    const command = this.redoStack.pop();
    if (command) {
      command.execute();
      this.undoStack.push(command);
    }
  }
}
