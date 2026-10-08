import { Component, inject } from '@angular/core';
import { UserFacadeService } from './user-facade.service';

@Component({
  selector: 'app-user',
  template: `<p>User: {{ user?.name }} has books to return: {{ user?.orders?.length || 0}}</p>`,
})
export class UserComponent {
  user: any;

  private userFacade = inject(UserFacadeService);

  constructor() {
    this.userFacade.getUserDetails(1).subscribe(data => {
      this.user = { ...data.user, orders: data.orders };
    });
  }
}
