import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat',
  standalone: true
})
export class DateFormatPipe implements PipeTransform {
  transform(dateStr: string): string {
    const parts = dateStr.split(',').map(part => parseInt(part.trim(), 10));
    const date = new Date(parts[0], parts[1] - 1, parts[2], parts[3], parts[4], parts[5], parts[6] / 1000000);
    return date.toISOString().slice(0, 23).replace('T', ' ');
  }
}