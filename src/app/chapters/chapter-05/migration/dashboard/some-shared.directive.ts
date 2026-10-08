import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[someShared]',
  standalone: true,
})
export class SomeSharedDirective {
  @HostBinding('style.textDecoration') decoration = '';

  @HostListener('mouseenter') onEnter() { this.decoration = 'underline'; }
  @HostListener('mouseleave') onLeave() { this.decoration = ''; }
}
