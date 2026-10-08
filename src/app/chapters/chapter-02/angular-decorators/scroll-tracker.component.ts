import { HostListener, Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-scroll-tracker',
  template: `
    <button (click)="start()" [disabled]="listening">Start window scroll listener</button>
    <button (click)="stop()" [disabled]="!listening">Stop</button>
    <p>Scroll to see console output</p>
  `,
})
export class ScrollTrackerComponent {
  listening = false;

  start() {
    this.listening = true;
  }

  stop() {
    this.listening = false;
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event) {
    if (!this.listening) return;
    const offsetY = window.scrollY;
    console.log(`Current scroll position: ${offsetY}px`);
  }
}
