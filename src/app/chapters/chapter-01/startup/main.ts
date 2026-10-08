// ============================================================================
// REFERENCE FILE ONLY: Modern Angular Startup Snippet
// ============================================================================
// This file is kept verbatim for reference and is intentionally never imported.
// The actual application bootstraps from src/main.ts.
// ============================================================================
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BooksComponent } from './books.component';
import { HomeComponent } from './home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'books', component: BooksComponent },
];

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
  ],
});
