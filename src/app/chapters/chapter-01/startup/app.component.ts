// app.component.ts
// Importing necessary Angular core functionality
import { Component, inject, signal } from '@angular/core';
// Importing a custom service for handling book-related operations
import { BookService } from './book.service';
@Component({
  // Explicitly tells component is using modern standalone design approach
  standalone: true,
  // The component's selector to be used as a custom HTML tag
  selector: 'app-root',
  // Path to the component’s HTML template
  templateUrl: './app.component.html',
  // Path to the component’s CSS styles
  styleUrl: './app.component.css',
})
export class AppComponent {
  // Injecting the BookService into the component via Angular’s dependency injection
  private bookService = inject(BookService);

  // Declaring a signal property to hold a list of books
  books = signal<string[]>([]);

  constructor() {
    // Set signal value to list of books from BookService response
    this.books.set(this.bookService.getBooks());
  }
}
