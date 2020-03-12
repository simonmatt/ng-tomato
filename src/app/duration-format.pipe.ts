import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'durationFormat'
})
export class DurationFormatPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    // tslint:disable-next-line: radix
    const min = parseInt((value / 60).toString());
    const s = value % 60;
    const time = s > 10 ? `${min}:${s}` : `${min}:0${s}`;
    return time;
  }

}
