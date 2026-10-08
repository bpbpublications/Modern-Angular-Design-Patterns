// Service-based state management without NgRx
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class CartService {
  private cart = new BehaviorSubject<{ name: string; price: number }[]>([]);
  cart$ = this.cart.asObservable();
  addItem(item: { name: string; price: number }) {
    this.cart.next([...this.cart.value, item]);
  }
}
