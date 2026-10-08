import { Directive, ElementRef, HostListener, Input } from '@angular/core';
@Directive({
  standalone: true,
  selector: '[appHoverHighlight]'
})
export class HoverHighlightDirective {
  @Input('appHoverHighlight') highlightColor = 'yellow';
  constructor(private el: ElementRef) {}
  @HostListener('mouseenter') onMouseEnter() {
    this.el.nativeElement.style.backgroundColor = this.highlightColor;
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.el.nativeElement.style.backgroundColor = '';
  }
}
