// ============================================================================
// GLUE FILE: Hosting The "Overview Of Built-In Validators" Template-Driven Snippets
// ============================================================================
// This file is NOT book code. It hosts the book's "Overview of built-in
// validators" template-driven snippets.
// ============================================================================
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-ch10-template-validators',
  imports: [FormsModule],
  templateUrl: './template-validators.component.html',
  styleUrl: './template-validators.component.scss',
})
export class TemplateValidatorsComponent {}
