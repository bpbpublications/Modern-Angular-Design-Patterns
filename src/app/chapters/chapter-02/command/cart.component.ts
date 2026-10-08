import { Component } from '@angular/core';
import { CommandService } from './command.service';
import { AddToCartCommand } from './add-to-cart.command';
@Component({
  standalone: true,
  selector: 'app-cart',
  template: `
    <button (click)="addItem()">Add Item</button>
    <button (click)="undoAction()">Undo</button>
    <ul>
      @for (item of cart; track $index) { <li>{{ item }}</li> }
    </ul>
  `
})
export class CartComponent {
  cart: string[] = [];
  constructor(private commandService: CommandService) {}
  addItem() {
    const command = new AddToCartCommand('New product', this.cart);
    this.commandService.executeCommand(command);
  }
  undoAction() {
    this.commandService.undoLastCommand();
  }
}
