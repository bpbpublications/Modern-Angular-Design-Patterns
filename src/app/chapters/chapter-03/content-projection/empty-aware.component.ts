import { NgTemplateOutlet } from '@angular/common';
import { Component, TemplateRef, contentChild } from '@angular/core';

@Component({
  selector: 'app-empty-aware',
  standalone: true,
  imports: [NgTemplateOutlet],
  template: `
    @if (content(); as contentRef) {
      <ng-container [ngTemplateOutlet]="contentRef"></ng-container>
    } @else {
      <p>No content provided.</p>
    }
  `
})
export class EmptyAwareComponent {
 content = contentChild(TemplateRef);
}
