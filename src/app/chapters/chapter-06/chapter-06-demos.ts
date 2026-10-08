// ============================================================================
// DEMO HOSTS: Chapter 06 Interactive Demos
// ============================================================================
// Wire the book's snippets into interactive demos without modifying the
// snippet code itself. Fragment snippets (code the book shows outside a
// class/file context) run verbatim inside host methods, following the
// chapter-01 exemple.
// ============================================================================
import {
  Component,
  DestroyRef,
  OnDestroy,
  Signal,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  BehaviorSubject,
  Observable,
  Subject,
  Subscription,
  catchError,
  combineLatest,
  distinctUntilChanged,
  filter,
  forkJoin,
  fromEvent,
  interval,
  of,
  retry,
  startWith,
  switchMap,
  take,
  timer,
  zip,
  debounceTime,
  throttleTime,
} from 'rxjs';
import { takeUntilDestroyed, toObservable, toSignal } from '@angular/core/rxjs-interop';

import { Product } from './core-concepts/product';
import { user, fetchData, render, authService } from './core-concepts/declarative-support';
import { UserPage } from './signals-in-components/user.page';
import { ConfigService as CatchErrorConfigService } from './error-handling/config-catch-error.service';
import { ConfigService as RetryConfigService } from './error-handling/config-retry.service';
import { ConfigService as RetryDelayConfigService } from './error-handling/config-retry-delay.service';
import { ConfigService as FinalizeConfigService } from './error-handling/config-finalize.service';
import { SenderComponent } from './event-driven/sender.component';
import { ReceiverComponent } from './event-driven/receiver.component';
import { userService, settingsService } from './event-driven/combining-support';
import { TickerComponent } from './large-scale/ticker.component';
import { UserFacade } from './service-ui/user.facade';
import { SearchApiService } from './reactive-forms/search-api.service';

@Component({
  selector: 'app-ch6-pull-push-demo',
  imports: [JsonPipe],
  template: `
    <p>
      <button (click)="runPull()">Pull: read signal value</button>
      <button (click)="runPush()">Push: GET /api/products</button>
    </p>
    @if (products().length) {
      <pre>{{ products() | json }}</pre>
    }
  `,
})
export class PullPushDemo {
  private http = inject(HttpClient);
  readonly products = signal<Product[]>([]);

  runPull() {
    const selectedId = signal('42');
    console.log(selectedId()); // pull: read current value
  }

  runPush() {
    this.http.get<Product[]>('/api/products').subscribe(products => {
      this.products.set(products); // push: update state when data arrives
    });
  }
}

@Component({
  selector: 'app-ch6-basic-observable-demo',
  template: `
    <button (click)="subscribeWithCallback()">stream$.subscribe(value => …)</button>
    <button (click)="subscribeWithObserver()">stream$.subscribe(&#123; next, error, complete &#125;)</button>
  `,
})
export class BasicObservableDemo {
  private stream$: Observable<unknown>;

  constructor() {
    const stream$ = new Observable(observer => {
      observer.next('Hello');
      observer.next('World');
      observer.complete();
    });

    this.stream$ = stream$;
  }

  subscribeWithCallback() {
    const stream$ = this.stream$;
    stream$.subscribe(value => console.log(value));
  }

  subscribeWithObserver() {
    const stream$ = this.stream$;
    stream$.subscribe({
      next: value => console.log('Received:', value),
      error: err => console.error('Error:', err),
      complete: () => console.log('Completed')
    });
  }
}

@Component({
  selector: 'app-ch6-declarative-demo',
  template: `
    <p>
      <code>user.isLoggedIn</code>: <code>{{ loggedIn() }}</code>
      <button (click)="toggle()">Toggle login</button>
    </p>
    <button (click)="runImperative()">Run imperative version</button>
    <button (click)="runDeclarative()">Subscribe to declarative version</button>
  `,
})
export class DeclarativeDemo implements OnDestroy {
  readonly loggedIn = signal(user.isLoggedIn);
  private declarativeSub?: Subscription;

  toggle() {
    user.isLoggedIn = !user.isLoggedIn;
    authService.isLoggedIn$.next(user.isLoggedIn);
    this.loggedIn.set(user.isLoggedIn);
  }

  runImperative() {
    if (user.isLoggedIn) {
      fetchData().then(data => render(data));
    }
  }

  runDeclarative() {
    this.declarativeSub?.unsubscribe();
    this.declarativeSub =
    authService.isLoggedIn$
      .pipe(filter(Boolean), switchMap(() => fetchData()))
      .subscribe(data => render(data));
  }

  ngOnDestroy() {
    this.declarativeSub?.unsubscribe();
  }
}

@Component({
  selector: 'app-ch6-signals-component-demo',
  imports: [UserPage],
  template: `
    <p>
      <button (click)="visible = !visible">
        {{ visible ? 'Destroy' : 'Create' }} &lt;app-user-page&gt;
      </button>
      — creating it fires GET /api/user; watch “Loading…” flip to the JSON payload.
    </p>
    @if (visible) {
      <app-user-page />
    }
  `,
})
export class SignalsComponentDemo {
  visible = false;
}

@Component({
  selector: 'app-ch6-subjects-demo',
  template: `
    <button (click)="runGreeting()">Observable: greeting$</button>
    <button (click)="runSubject()">Subject: two subscribers</button>
    <button (click)="runBehaviorSubject()">BehaviorSubject: late subscriber</button>
  `,
})
export class SubjectsDemo {
  runGreeting() {
    const greeting$ = new Observable<string>(observer => {
      observer.next('Hello');
      observer.next('RxJS!');
      observer.complete();
    });

    greeting$.subscribe(value => console.log(value));
  }

  runSubject() {
    const messageSubject = new Subject<string>();

    messageSubject.subscribe(value => console.log('Subscriber 1:', value));
    messageSubject.subscribe(value => console.log('Subscriber 2:', value));

    messageSubject.next('Hello from Subject!');
  }

  runBehaviorSubject() {
    const counter$ = new BehaviorSubject<number>(0); // initial value

    counter$.subscribe(value => console.log('A:', value)); // Logs 0
    counter$.next(1);
    counter$.next(2);
    counter$.subscribe(value => console.log('B:', value)); // Logs 2 (latest)
  }
}

@Component({
  selector: 'app-ch6-debounce-throttle-demo',
  imports: [ReactiveFormsModule],
  template: `
    <p>
      Debounce — type and pause 300ms:
      <input [formControl]="searchControl" placeholder="Search…" />
    </p>
    <p>
      Throttle —
      <button (click)="startScrollListener()" [disabled]="scrollSub !== undefined">
        Start window scroll listener
      </button>
      <button (click)="stopScrollListener()" [disabled]="scrollSub === undefined">Stop</button>
      then scroll this page (max one log per second).
    </p>
  `,
})
export class DebounceThrottleDemo implements OnDestroy {
  readonly searchControl = new FormControl('');
  scrollSub?: Subscription;

  constructor() {
    const searchControl = this.searchControl;
    searchControl.valueChanges
    .pipe(debounceTime(300))
    .subscribe(value => this.search(value));
  }

  private search(value: string | null) {
    console.log('search:', value);
  }

  startScrollListener() {
    this.scrollSub = fromEvent(window, 'scroll')
      .pipe(throttleTime(1000)).subscribe(() => console.log('Scrolling...'));
  }

  stopScrollListener() {
    this.scrollSub?.unsubscribe();
    this.scrollSub = undefined;
  }

  ngOnDestroy() {
    this.stopScrollListener();
  }
}

@Component({
  selector: 'app-ch6-error-handling-demo',
  imports: [JsonPipe],
  providers: [
    CatchErrorConfigService,
    RetryConfigService,
    RetryDelayConfigService,
    FinalizeConfigService,
  ],
  template: `
    <p class="hint">
      The fake /api/data endpoint fails twice, then succeeds (repeating) — watch the attempts
      in the console panel.
    </p>
    <div class="row">
      <button (click)="catchErrorService.updateData()">catchError — updateData()</button>
      <span>data: <code>{{ catchErrorService.data | json }}</code></span>
    </div>
    <div class="row">
      <button (click)="retryService.updateData()">retry(3) — updateData()</button>
    </div>
    <div class="row">
      <button (click)="retryDelayService.updateData()">retry + delay(1000) — updateData()</button>
    </div>
    <div class="row">
      <button (click)="finalizeService.updateData()">finalize — updateData()</button>
      <span>
        isLoading: <code>{{ finalizeService.isLoading }}</code> · data:
        <code>{{ finalizeService.data | json }}</code>
      </span>
    </div>
    <div class="row">
      <button (click)="runBackoff()">Exponential backoff (retry + timer)</button>
    </div>
  `,
  styles: `
    .row { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
    .hint { color: #5a5f7d; font-size: 13px; }
  `,
})
export class ErrorHandlingDemo {
  readonly catchErrorService = inject(CatchErrorConfigService);
  readonly retryService = inject(RetryConfigService);
  readonly retryDelayService = inject(RetryDelayConfigService);
  readonly finalizeService = inject(FinalizeConfigService);
  private http = inject(HttpClient);

  runBackoff() {
    this.http.get('/api/data').pipe(
      // Exponential backoff: 250ms, 500ms, 1000ms — then give up after 3 retries.
      retry({ count: 3, delay: (error, retryCount) => timer(2 ** (retryCount - 1) * 250) }),
      catchError(() => of([]))
    ).subscribe(data => console.log(data));
  }
}

@Component({
  selector: 'app-ch6-event-bus-demo',
  imports: [SenderComponent, ReceiverComponent],
  template: `
    <p>Sender component: <app-sender /></p>
    <p>Receiver component reacts through the EventBusService: <app-receiver /></p>
  `,
})
export class EventBusDemo {}

@Component({
  selector: 'app-ch6-combine-streams-demo',
  template: `
    <p>
      <button (click)="startCombineLatest()">Subscribe combineLatest([user$, theme$])</button>
      <button (click)="nextUser()">Change user</button>
      <button (click)="nextTheme()">Change theme</button>
    </p>
    <p>
      <button (click)="runForkJoin()">forkJoin(&#123; user, settings &#125;)</button>
    </p>
    <p>
      <button (click)="startZip()">Subscribe zip(timer$, click$)</button>
      <button (click)="emitClick()">click$.next('click')</button>
    </p>
  `,
})
export class CombineStreamsDemo implements OnDestroy {
  private http = inject(HttpClient);
  readonly timer$ = interval(1000);
  readonly click$ = new Subject<string>();

  private combineSub?: Subscription;
  private zipSub?: Subscription;

  private users = ['Alice', 'Bob', 'Carol'];
  private themes = ['light', 'dark', 'sepia'];

  startCombineLatest() {
    this.combineSub?.unsubscribe();
    this.combineSub =
    combineLatest([userService.user$, settingsService.theme$])
    .subscribe(([user, theme]) => {
    console.log('User:', user, 'Theme:', theme);
    });
  }

  nextUser() {
    const i = this.users.indexOf(userService.user$.value);
    userService.user$.next(this.users[(i + 1) % this.users.length]);
  }

  nextTheme() {
    const i = this.themes.indexOf(settingsService.theme$.value);
    settingsService.theme$.next(this.themes[(i + 1) % this.themes.length]);
  }

  runForkJoin() {
    const http = this.http; 
    
    forkJoin({
      user: http.get('/api/user'),
      settings: http.get('/api/settings')
    }).subscribe(result => {
      console.log(result.user, result.settings);
    });
  }

  startZip() {
    this.zipSub?.unsubscribe();
    const timer$ = this.timer$;
    const click$ = this.click$;
    this.zipSub =
    zip(timer$, click$).subscribe(([time, click]) => {
    console.log('Timer:', time, 'Click:', click);
    });
  }

  emitClick() {
    this.click$.next('click');
  }

  ngOnDestroy() {
    this.combineSub?.unsubscribe();
    this.zipSub?.unsubscribe();
  }
}

@Component({
  selector: 'app-ch6-subscriptions-demo',
  imports: [AsyncPipe, TickerComponent],
  template: `
    <!-- Prefer the AsyncPipe in templates -->
    <h1>{{ user$ | async }}</h1>
    <p><button (click)="changeUser()">Emit next user through user$</button></p>
    <p>
      <button (click)="showTicker = !showTicker">
        {{ showTicker ? 'Destroy' : 'Create' }} &lt;app-ticker&gt;
      </button>
      @if (showTicker) {
        <span>— TickerComponent (interval + takeUntilDestroyed): <app-ticker /></span>
      }
    </p>
    <p>
      <button (click)="loadUserOnce()">Single-use stream: take(1)</button>
    </p>
  `,
  styles: `h1 { margin: 0 0 6px; font-size: 22px; }`,
})
export class SubscriptionsDemo {
  private users = ['Jane Doe', 'John Smith', 'Ada Lovelace'];
  private index = 0;
  readonly user$ = new BehaviorSubject<string>(this.users[0]);

  showTicker = false;
  private http = inject(HttpClient);

  changeUser() {
    this.index = (this.index + 1) % this.users.length;
    this.user$.next(this.users[this.index]);
  }

  loadUserOnce() {
    this.http.get('/api/user')
      .pipe(take(1))
      .subscribe();
  }
}

@Component({
  selector: 'app-ch6-hybrid-search-demo',
  imports: [JsonPipe],
  template: `
    <p>
      Search (signal → toObservable → debounce → switchMap → toSignal):
      <input
        [value]="searchQuery()"
        (input)="searchQuery.set($any($event.target).value)"
        placeholder="Try 'ap' or 'berry'…"
      />
    </p>
    <pre>{{ results() | json }}</pre>
  `,
})
export class HybridSearchDemo {
  readonly searchQuery: WritableSignal<string>;
  readonly results: Signal<Object | never[]>;

  constructor() {
    const searchQuery = signal('');
    const searchQuery$ = toObservable(searchQuery).pipe(
      debounceTime(300),
      distinctUntilChanged()
    );

    const http = inject(HttpClient);
    const results = toSignal(
      searchQuery$.pipe(switchMap(q => http.get(`/api/search?q=${q}`))),
      { initialValue: [] }
    );

    this.searchQuery = searchQuery;
    this.results = results;
  }
}

@Component({
  selector: 'app-ch6-reactive-forms-demo',
  imports: [ReactiveFormsModule],
  // Scope the supporting SearchApiService to this host so its HttpClient
  // comes from the route injector carrying the fake backend interceptor.
  providers: [SearchApiService],
  template: `
    <form [formGroup]="form">
      <input formControlName="search" placeholder="Type to search (debounced 300ms)…" />
    </form>
    <ul>
      @for (result of results; track $index) {
        <li>{{ result }}</li>
      }
    </ul>
  `,
})
export class ReactiveFormsDemo {
  // SearchApiService is provided on this host (see @Component providers) 
  // so it resolves HttpClient from this route's injector, 
  // where the fake backend interceptor lives.
  readonly form = new FormGroup({ search: new FormControl('') });
  results: string[] = [];
  private api = inject(SearchApiService);
  private destroyRef = inject(DestroyRef);

  constructor() {
    this.form.get('search')!.valueChanges
      .pipe(
        // Seed the stream with the control's current value so the
        // initial (unfiltered) results render immediately, matching the
        // toObservable(signal) demo above, which emits its current value on
        // subscribe.
        startWith(this.form.get('search')!.value),
        takeUntilDestroyed(this.destroyRef),
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(value => this.api.search(value))
      )
      .subscribe(results => this.results = results);
  }
}

@Component({
  selector: 'app-ch6-user-facade-demo',
  imports: [JsonPipe],
  // UserFacade is providedIn 'root' in the book's code; providing it here
  // as well scopes this instance to the route injector so its HttpClient goes
  // through the chapter's fake backend interceptor.
  providers: [UserFacade],
  template: `
    <!-- Book template snippet (verbatim): -->
    @if (userFacade.loading()) {
      <p>Loading…</p>
    }
    @else {
      <pre>{{ userFacade.user() | json }}</pre>
    }
  `,
})
export class UserFacadeDemo {
  readonly userFacade = inject(UserFacade);
}
