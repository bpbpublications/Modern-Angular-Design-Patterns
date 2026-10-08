// ============================================================================
// DEMO HOSTS: Chapter 02 Interactive Demos
// ============================================================================
// Wire the book's snippets into interactive demos without modifying the
// snippet code itself.
// ============================================================================
import { Component, inject } from '@angular/core';

import { UserProfile } from './ts-features/user-profile.model';
import { UserProfileService } from './ts-features/user-profile.service';
import { User as ApiUser } from './ts-features/user';
import { UsersComponent } from './ts-features/users.component';
import {
  BasicNotification,
  EmailNotification as EmailNotificationDecorator,
  SMSNotification as SMSNotificationDecorator,
} from './decorator-pattern/notification-decorators';
import { HoverHighlightDirective } from './angular-decorators/hover-highlight.directive';
import { CapitalizePipe } from './angular-decorators/capitalize.pipe';
import { ScrollTrackerComponent } from './angular-decorators/scroll-tracker.component';
import { User as LoggedUser } from './custom-decorators/logger-class-decorator';
import { Calculator } from './custom-decorators/log-method-decorator';
import { Profile } from './custom-decorators/read-only-decorator';
import { User as CloneableUser } from './prototype/cloneable-user';
import { Price } from './prototype/price';
import { ProductPrototype } from './prototype/product-prototype';
import { NotificationFactory } from './factory/notification-factory';
import { LoggerFactory } from './factory/logger-factory.service';
import { PaymentProcessor, CreditCardPayment, PayPalPayment } from './strategy/payment-strategies';
import { SortingStrategy, BubbleSortStrategy, QuickSortStrategy } from './strategy/sorting-strategy';
import { TableComponent } from './strategy/table.component';
import { UserProfileBuilder } from './builder/userProfileBuilder';
import { UserService } from './builder/user.service';
import { Light, LightOnCommand } from './command/light-commands';
import { CartComponent } from './command/cart.component';
import { AddToCartCommand } from './command/add-to-cart.command';
import { CommandService as AdvancedCommandService } from './command-advanced/command.service';
import { partialUser, user } from './advanced-types/mapped-types';
import type { UserPreview, UserWithoutEmail } from './advanced-types/utility-types';
import { AddToCartSync, AddToCartAsync } from './advanced-types/conditional-types';
import { printLength } from './advanced-types/type-guards';

@Component({
  selector: 'app-ch2-static-typing-demo',
  template: `
    <button (click)="createModel()">new UserProfile('Alice', 30, 'alice@example.com')</button>
    <button (click)="fetchProfile()">UserProfileService.getProfile()</button>
    <p>
      <small>
        <code>getProfile()</code> is mocked/stubbed for this demo — <code>/api/profile</code> does not
        exist in this demo app, so it returns a static <code>UserProfile</code> instead of making the
        HTTP call; click the button to log it to the console.
      </small>
    </p>
  `,
})
export class StaticTypingDemo {
  private profileService = inject(UserProfileService);

  createModel() {
    const profile = new UserProfile('Alice', 30, 'alice@example.com');
    console.log('UserProfile instance:', profile);
  }

  fetchProfile() {
    this.profileService.getProfile().subscribe({
      next: (profile) => console.log('Profile received:', profile),
      error: (err) => console.error('getProfile() failed:', err.message ?? err),
    });
  }
}

@Component({
  selector: 'app-ch2-interfaces-demo',
  template: `<button (click)="run()">Create an object typed as User and log it</button>`,
})
export class InterfacesDemo {
  run() {
    const user: ApiUser = { id: 1, name: 'Alice', email: 'alice@example.com' };
    console.log('User (conforms to the User interface):', user);
  }
}

@Component({
  selector: 'app-ch2-generics-demo',
  imports: [UsersComponent],
  template: `
    @if (show) {
      <app-users />
    } @else {
      <button (click)="show = true">Mount UsersComponent (fetches jsonplaceholder users)</button>
    }
  `,
})
export class GenericsDemo {
  show = false;
}

@Component({
  selector: 'app-ch2-decorator-pattern-demo',
  template: `<button (click)="run()">Run the notification decorator chain</button>`,
})
export class DecoratorPatternDemo {
  run() {
    // Create a basic notification instance
    const basicNotification = new BasicNotification();
    console.log(basicNotification.send("Hello!"));
    // Output: Sending basic notification: Hello!

    // Wrap the base notification with an Email decorator
    const emailNotification = new EmailNotificationDecorator(basicNotification);
    console.log(emailNotification.send("Hello!"));
    // Output: Email: Sending basic notification: Hello!

    // Wrap the base notification with an SMS decorator
    const smsNotification = new SMSNotificationDecorator(emailNotification);
    console.log(smsNotification.send("Hello!"));
    // Output: SMS: Sending basic notification: Hello!
  }
}

@Component({
  selector: 'app-ch2-hover-highlight-demo',
  imports: [HoverHighlightDirective],
  template: `
    <p appHoverHighlight="lightblue">Hover over this text!</p>
    <p appHoverHighlight="orange">Hover to see the effect!</p>
  `,
})
export class HoverHighlightDemo {}

@Component({
  selector: 'app-ch2-capitalize-pipe-demo',
  imports: [CapitalizePipe],
  template: `<p>{{ 'hello' | capitalize }}</p> <!-- Output: Hello -->`,
})
export class CapitalizePipeDemo {}

@Component({
  selector: 'app-ch2-scroll-tracker-demo',
  imports: [ScrollTrackerComponent],
  template: `<app-scroll-tracker />`,
})
export class ScrollTrackerDemo {}

@Component({
  selector: 'app-ch2-class-decorator-demo',
  template: `
    <button (click)="run()">const user = new User()</button>
    <p>
      <small>
        The <code>@Logger</code> decorator already logged
        "Class User has been initialized." once, when the class was defined at module load.
      </small>
    </p>
  `,
})
export class ClassDecoratorDemo {
  run() {
    const user = new LoggedUser();
  }
}

@Component({
  selector: 'app-ch2-method-decorator-demo',
  template: `<button (click)="run()">console.log(calc.add(3, 5))</button>`,
})
export class MethodDecoratorDemo {
  run() {
    const calc = new Calculator();
    console.log(calc.add(3, 5));
  }
}

@Component({
  selector: 'app-ch2-property-decorator-demo',
  template: `<button (click)="run()">Create Profile, try to reassign username, log it</button>`,
})
export class PropertyDecoratorDemo {
  run() {
    const profile = new Profile();
    try {
      // @ReadOnly makes `username` non-writable, so this throws a TypeError.
      profile.username = 'NewUser';
    } catch (error) {
      // Confirms the ReadOnly decorator actually blocked the reassignment.
      console.error('Reassignment blocked:', error);
    } finally {
      // Runs whether the assignment throws or not, so this always logs
      // the actual (unchanged) value of `username`.
      console.log(profile.username);
    }
  }
}

@Component({
  selector: 'app-ch2-prototype-demo',
  template: `
    <button (click)="cloneUser()">user1.clone()</button>
    <button (click)="cloneProduct()">ProductPrototype.clone()</button>
  `,
})
export class PrototypeDemo {
  cloneUser() {
    const user1 = new CloneableUser('Alice', 'alice@example.com');
    // Creates a copy instead of a new instance
    const user2 = user1.clone(); 

    console.log(user2);
    console.log('Same values, distinct objects:', user1 !== user2);
  }

  cloneProduct() {
    const product = new ProductPrototype('Laptop', new Price(1200, 'USD'));
    const copy = product.clone();
    console.log('original:', product, '→ clone:', copy);
    console.log('Price was deep-cloned:', product.price !== copy.price);
  }
}

@Component({
  selector: 'app-ch2-factory-demo',
  template: `
    <button (click)="email()">createNotification('email').send('Hello via Email!')</button>
    <button (click)="sms()">createNotification('sms').send('Hello via SMS!')</button>
  `,
})
export class FactoryDemo {
  email() {
    const emailNotifier = NotificationFactory.createNotification('email');
    emailNotifier.send('Hello via Email!');
  }

  sms() {
    NotificationFactory.createNotification('sms').send('Hello via SMS!');
  }
}

@Component({
  selector: 'app-ch2-logger-factory-demo',
  template: `
    <button (click)="console()">createLogger('console').log(...)</button>
    <button (click)="file()">createLogger('file').log(...)</button>
  `,
})
export class LoggerFactoryDemo {
  private loggerFactory = inject(LoggerFactory);

  console() {
    this.loggerFactory.createLogger('console').log('Hello from ConsoleLogger');
  }

  file() {
    this.loggerFactory.createLogger('file').log('Hello from FileLogger');
  }
}

@Component({
  selector: 'app-ch2-strategy-ts-demo',
  template: `
    <button (click)="creditCard()">PaymentProcessor(new CreditCardPayment()).executePayment(100)</button>
    <button (click)="payPal()">PaymentProcessor(new PayPalPayment()).executePayment(100)</button>
  `,
})
export class StrategyTsDemo {
  creditCard() {
    const payment = new PaymentProcessor(new CreditCardPayment());
    payment.executePayment(100);
  }

  payPal() {
    const payment = new PaymentProcessor(new PayPalPayment());
    payment.executePayment(100);
  }
}

@Component({
  selector: 'app-ch2-sorting-bubble-host',
  imports: [TableComponent],
  providers: [{ provide: SortingStrategy, useClass: BubbleSortStrategy }],
  template: `<app-table />`,
})
export class SortingBubbleHost {}

@Component({
  selector: 'app-ch2-sorting-quick-host',
  imports: [TableComponent],
  providers: [{ provide: SortingStrategy, useClass: QuickSortStrategy }],
  template: `<app-table />`,
})
export class SortingQuickHost {}

@Component({
  selector: 'app-ch2-strategy-angular-demo',
  imports: [SortingBubbleHost, SortingQuickHost],
  template: `
    <p>
      The same <code>TableComponent</code> resolves a different <code>SortingStrategy</code> from
      its injector — mirroring the per-route <code>providers</code> overrides:
    </p>
    <app-ch2-sorting-bubble-host />
    <app-ch2-sorting-quick-host />
  `,
})
export class StrategyAngularDemo {}

@Component({
  selector: 'app-ch2-builder-demo',
  template: `
    <button (click)="buildInline()">new UserProfileBuilder().setName('Alice').setAge(30).build()</button>
    <button (click)="buildViaService()">UserService.createUserProfile()</button>
  `,
})
export class BuilderDemo {
  private userService = inject(UserService);

  buildInline() {
    const user = new UserProfileBuilder().setName('Alice').setAge(30).build();
    console.log(user);
  }

  buildViaService() {
    console.log(this.userService.createUserProfile());
  }
}

@Component({
  selector: 'app-ch2-command-light-demo',
  template: `<button (click)="run()">turnOnCommand.execute() then .undo()</button>`,
})
export class CommandLightDemo {
  run() {
    // Usage
    const light = new Light();
    const turnOnCommand = new LightOnCommand(light);
    turnOnCommand.execute(); // Output: Light is ON
    turnOnCommand.undo(); // Output: Light is OFF
  }
}

@Component({
  selector: 'app-ch2-command-cart-demo',
  imports: [CartComponent],
  template: `<app-cart />`,
})
export class CommandCartDemo {}

@Component({
  selector: 'app-ch2-command-advanced-demo',
  template: `
    <button (click)="add()">execute(AddToCartCommand)</button>
    <button (click)="undo()">undo()</button>
    <button (click)="redo()">redo()</button>
    <p>Cart: {{ cart.length ? cart.join(', ') : '(empty)' }}</p>
  `,
})
export class CommandAdvancedDemo {
  private commands = inject(AdvancedCommandService);
  cart: string[] = [];
  private counter = 0;

  add() {
    this.counter++;
    this.commands.execute(new AddToCartCommand(`Product ${this.counter}`, this.cart));
  }

  undo() {
    this.commands.undo();
  }

  redo() {
    this.commands.redo();
  }
}

@Component({
  selector: 'app-ch2-mapped-types-demo',
  template: `<button (click)="run()">Log partialUser (PartialType) and user (ReadonlyType)</button>`,
})
export class MappedTypesDemo {
  run() {
    console.log('partialUser (PartialType<User>):', partialUser);
    console.log('user (ReadonlyType<User>):', user);
    console.log("Reassigning user.name is rejected at compile time — see mapped-types.ts");
  }
}

@Component({
  selector: 'app-ch2-utility-types-demo',
  template: `<button (click)="run()">Log values typed as UserPreview / UserWithoutEmail</button>`,
})
export class UtilityTypesDemo {
  run() {
    const preview: UserPreview = { id: 1, name: 'Alice' };
    const withoutEmail: UserWithoutEmail = { id: 1, name: 'Alice' };
    console.log('UserPreview (Pick):', preview);
    console.log('UserWithoutEmail (Omit):', withoutEmail);
  }
}

@Component({
  selector: 'app-ch2-conditional-types-demo',
  template: `<button (click)="run()">Run AddToCartSync / AddToCartAsync</button>`,
})
export class ConditionalTypesDemo {
  run() {
    const syncResult: number = new AddToCartSync().execute();
    console.log('AddToCartSync.execute() →', syncResult);

    new AddToCartAsync().execute().then((asyncResult) => {
      console.log('AddToCartAsync.execute() resolved →', asyncResult);
    });
  }
}

@Component({
  selector: 'app-ch2-type-guards-demo',
  template: `
    <button (click)="asString()">printLength('hello')</button>
    <button (click)="asNumber()">printLength(42)</button>
  `,
})
export class TypeGuardsDemo {
  asString() {
    printLength('hello');
  }

  asNumber() {
    printLength(42);
  }
}
