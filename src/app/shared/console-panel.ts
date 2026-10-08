import { Component, effect, ElementRef, OnDestroy, signal, viewChild } from '@angular/core';

interface ConsoleLine {
  level: 'log' | 'warn' | 'error';
  text: string;
}

// Mirrors console output on screen while the hosting page is alive, so book
// snippets that log to the console can stay untouched yet remain visible.
// Rendered as a dock fixed to the bottom of the viewport (devtools-style) so
// the output stays in view while scrolling through the demos.
@Component({
  selector: 'app-console-panel',
  templateUrl: './console-panel.html',
  styleUrl: './console-panel.scss',
})
export class ConsolePanel implements OnDestroy {
  readonly lines = signal<ConsoleLine[]>([]);
  readonly expanded = signal(false);
  readonly flash = signal(false);
  readonly latest = () => this.lines().at(-1);

  private readonly body = viewChild<ElementRef<HTMLElement>>('body');
  private flashTimer: ReturnType<typeof setTimeout> | undefined;

  private readonly original = {
    log: console.log,
    warn: console.warn,
    error: console.error,
  };

  constructor() {
    const push = (level: ConsoleLine['level'], args: unknown[]) => {
      const text = args
        .map((a) => {
          if (typeof a === 'string') return a;
          try {
            return JSON.stringify(a);
          } catch {
            return String(a);
          }
        })
        .join(' ');
      this.lines.update((current) => [...current, { level, text }]);
      this.flash.set(true);
      clearTimeout(this.flashTimer);
      this.flashTimer = setTimeout(() => this.flash.set(false), 400);
    };

    console.log = (...args: unknown[]) => {
      push('log', args);
      this.original.log.apply(console, args);
    };
    console.warn = (...args: unknown[]) => {
      push('warn', args);
      this.original.warn.apply(console, args);
    };
    console.error = (...args: unknown[]) => {
      push('error', args);
      this.original.error.apply(console, args);
    };

    // Keep the newest entry in view whenever lines change or the body appears.
    effect(() => {
      this.lines();
      const el = this.body()?.nativeElement;
      if (el) {
        setTimeout(() => (el.scrollTop = el.scrollHeight));
      }
    });

    // Reserve scroll space for the expanded dock so page content near the
    // bottom can always be scrolled above it instead of being covered
    // (see body.console-dock-expanded in styles.scss).
    effect(() => {
      document.body.classList.toggle('console-dock-expanded', this.expanded());
    });
  }

  toggle() {
    const expanding = !this.expanded();
    if (expanding) {
      // If the user is near the bottom of the page, shift the view up by the
      // dock's height so the example they were looking at stays visible.
      const dockBody = window.innerHeight * 0.32;
      const distanceToBottom =
        document.documentElement.scrollHeight - (window.scrollY + window.innerHeight);
      if (distanceToBottom < dockBody) {
        setTimeout(() => window.scrollBy({ top: dockBody, behavior: 'smooth' }));
      }
    }
    this.expanded.update((v) => !v);
  }

  clear() {
    this.lines.set([]);
  }

  ngOnDestroy() {
    clearTimeout(this.flashTimer);
    document.body.classList.remove('console-dock-expanded');
    console.log = this.original.log;
    console.warn = this.original.warn;
    console.error = this.original.error;
  }
}
