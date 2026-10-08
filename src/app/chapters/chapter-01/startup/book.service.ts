// book.service.ts
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root' // This makes the service available application-wide
})
export class BookService {
  private books = ['Angular for Beginners', 'Advanced Angular', 'Mastering RxJS'];
  getBooks() {
    return this.books;
  }
}
