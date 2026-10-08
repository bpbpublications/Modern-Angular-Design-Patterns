import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titlecaseStrict',
  standalone: true
})
export class TitleCaseStrictPipe implements PipeTransform {
  transform(value: string): string {
    return value.replace(/\b\w/g, c => c.toUpperCase());
  }
}
