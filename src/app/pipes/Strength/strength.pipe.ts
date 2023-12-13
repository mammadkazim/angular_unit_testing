import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'strength',
})
export class StrengthPipe implements PipeTransform {
  transform(value: number): string {
    if (value < 10) {
      return value + ' weak';
    } else {
      return value + ' strong';
    }
  }
}
