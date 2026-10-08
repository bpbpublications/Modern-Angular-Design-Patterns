import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-ch9-hero',
  imports: [NgOptimizedImage],
  template: `
    <img
      ngSrc="/assets/images/hero.jpg"
      width="800"
      height="400"
      alt="Hero banner"
      priority
    />
  `,
})
export class HeroComponent {}
