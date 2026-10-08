// "Snapshot" — captures parameters once when the component initializes
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-ch8-user-detail',
  template: `User ID: {{ userId }}`,
})
export class UserDetailComponent {
  private route = inject(ActivatedRoute);

  readonly userId = this.route.snapshot.paramMap.get('id'); // string | null
}
