// ============================================================================
// REFERENCE FILE ONLY: Core Route Configuration Properties
// ============================================================================
// This file is kept verbatim for reference and is intentionally never imported.
// The book shows each route object as a bare literal (path, component,
// children, redirectTo, pathMatch); here each literal is kept verbatim but
// wrapped in an exported const so the file compiles.
// ============================================================================
import { Component } from '@angular/core';
import { Route, Routes } from '@angular/router';

// Supporting DashboardComponent: referenced by the book's `path` snippet but
// not defined in the book itself.
@Component({ standalone: true, selector: 'app-ch8-example-dashboard', template: `Dashboard` })
export class DashboardComponent {}

// Supporting UserProfileComponent: referenced by the book's `path` snippet
// but not defined in the book itself.
@Component({ standalone: true, selector: 'app-ch8-example-user-profile', template: `User profile` })
export class UserProfileComponent {}

// Supporting AboutComponent: referenced by the book's `component` snippet but
// not defined in the book itself.
@Component({ standalone: true, selector: 'app-ch8-example-about', template: `About` })
export class AboutComponent {}

// Supporting SettingsComponent: referenced by the book's `children` snippet
// but not defined in the book itself.
@Component({ standalone: true, selector: 'app-ch8-example-settings', template: `Settings` })
export class SettingsComponent {}

// Supporting ProfileSettingsComponent: referenced by the book's `children`
// snippet but not defined in the book itself.
@Component({ standalone: true, selector: 'app-ch8-example-profile-settings', template: `Profile settings` })
export class ProfileSettingsComponent {}

// Supporting SecuritySettingsComponent: referenced by the book's `children`
// snippet but not defined in the book itself.
@Component({ standalone: true, selector: 'app-ch8-example-security-settings', template: `Security settings` })
export class SecuritySettingsComponent {}

// path
export const pathExamples: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'user/:id', component: UserProfileComponent },
];

// component
export const componentExample: Route =
  { path: 'about', component: AboutComponent };

// children
export const childrenExample: Route =
{
  path: 'settings',
  component: SettingsComponent,
  children: [
    { path: 'profile', component: ProfileSettingsComponent },
    { path: 'security', component: SecuritySettingsComponent }
  ]
};

// redirectTo
export const redirectExample: Route =
  { path: '', redirectTo: '/home', pathMatch: 'full' };

// pathMatch — Example:
export const pathMatchExamples: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // full URL must be ''
  { path: '', redirectTo: '/home', pathMatch: 'prefix' }, // matches any route starting with ''
];
