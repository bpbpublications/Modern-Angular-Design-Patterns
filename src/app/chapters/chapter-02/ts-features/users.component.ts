import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { User } from './user';

@Component({
  selector: 'app-users',
  template: `<p>Users loaded!</p>`
})
export class UsersComponent implements OnInit {
  constructor(private apiService: ApiService<User[]>) {}

  ngOnInit() {
    this.apiService.get('https://jsonplaceholder.typicode.com/users').subscribe(users => {
      console.log(users);
    });
  }
}
