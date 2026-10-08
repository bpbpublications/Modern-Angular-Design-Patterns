import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-ch8-route-config-profile-page',
  template: `<h4>Profile {{ id }}</h4>`,
})
export class ProfilePage {
  readonly id = inject(ActivatedRoute).snapshot.paramMap.get('id');
}
