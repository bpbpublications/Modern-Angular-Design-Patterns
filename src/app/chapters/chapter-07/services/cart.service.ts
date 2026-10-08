import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CartService {
  addItemToCart(item: {
    name: string;
    price: number;
  }): Observable<{ name: string; price: number }> {
    console.log('[CartService] calling API to add item:', item.name);
    return of(item).pipe(
      delay(300),
      tap(() => console.log('[CartService] API confirmed item:', item.name)),
    );
  }
}
