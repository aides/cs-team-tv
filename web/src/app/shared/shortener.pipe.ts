import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortener'
})
export class ShortenerPipe implements PipeTransform {
  transform(value: string): string {
    return value.replace('clientsuccess-', '')
      .replace('clientsuccess', 'cs')
      .replace('searchservice', 'ss');
  }
}
