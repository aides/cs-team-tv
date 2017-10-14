import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initials'
})
export class InitialsPipe implements PipeTransform {
  transform(value: string): any {
    if (!value) {
      return '??';
    }

    const names = value.split(' ');
    return names[0][0] + (names[1] ? names[1][0] : '');
  }
}
