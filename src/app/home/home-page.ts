import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CHAPTERS } from '../chapters';

@Component({
  selector: 'app-home-page',
  imports: [RouterLink],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {
  protected readonly chapters = CHAPTERS;
}
