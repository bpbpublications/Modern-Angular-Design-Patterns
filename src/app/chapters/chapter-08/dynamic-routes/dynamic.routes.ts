import { Routes } from '@angular/router';
import { UserDetailComponent } from './user-detail.component';
import { ProductPageComponent } from './product-page.component';

export const routes: Routes = [
  { path: 'user/:id', component: UserDetailComponent },
  { path: 'product/:slug', component: ProductPageComponent }
];
