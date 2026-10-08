import { Route } from '@angular/router';
import { ChatComponent } from './chat.component';

export const auxRouteExample: Route =
  { path: 'chat', component: ChatComponent, outlet: 'sidebar' };
