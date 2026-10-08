import { Injectable, inject } from '@angular/core';
import { forkJoin } from 'rxjs';
import { UserService } from './user.service';
import { OrderService } from './order.service';

@Injectable({ providedIn: 'root' })
export class UserFacadeService {
  private userService = inject(UserService);
  private orderService = inject(OrderService);

  getUserDetails(userId: number) {
    return forkJoin({
      user: this.userService.getUserById(userId),
      orders: this.orderService.getOrdersByUserId(userId)
    });
  }
}
