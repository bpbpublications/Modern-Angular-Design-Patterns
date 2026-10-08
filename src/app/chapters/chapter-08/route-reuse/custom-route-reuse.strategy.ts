// Custom RouteReuseStrategy that caches and restores routes explicitly 
// opted in via data: { reuse: true }. Registered app-wide 
// in app.config.ts — see the comment there for why that's safe.
import { Injectable } from '@angular/core';
import {
  RouteReuseStrategy,
  ActivatedRouteSnapshot,
  DetachedRouteHandle,
} from '@angular/router';

@Injectable()
export class CustomRouteReuseStrategy implements RouteReuseStrategy {
  private storedRoutes = new Map<string, DetachedRouteHandle>();

  // Only store routes explicitly marked with data: { reuse: true }
  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return route.data['reuse'] === true;
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle | null): void {
    const key = this.getKey(route);
    if (handle) {
      this.storedRoutes.set(key, handle);
    } else {
      this.storedRoutes.delete(key);
    }
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return this.storedRoutes.has(this.getKey(route));
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    return this.storedRoutes.get(this.getKey(route)) ?? null;
  }

  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return future.routeConfig === curr.routeConfig;
  }

  // Keys are built from evaluated URL segments, so parameterized routes
  // like /user/1 and /user/2 get separate cache entries — usually what
  // you want, since it prevents reattaching one user's cached view
  // under another user's URL.
  private getKey(route: ActivatedRouteSnapshot): string {
    return route.pathFromRoot
      .map(v => v.url.map(segment => segment.path).join('/'))
      .filter(path => path.length > 0)
      .join('/');
  }
}
