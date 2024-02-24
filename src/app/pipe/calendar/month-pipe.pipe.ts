import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'monthName',
  standalone: true
})
export class MonthPipePipe implements PipeTransform {
  transform(value: number): string {
    const month = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];
    return month[value];
  }
}
