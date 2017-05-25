import { Pipe, PipeTransform } from '@angular/core';
import { ITime } from './services/timer';

@Pipe({
  name: 'time',
  pure: false
})
export class TimePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const time = <ITime>value;
    if (time.minutes > 0) {
      return `${time.minutes}'${this.pad2(time.seconds)}"`;
    } else {
      return `${time.seconds}"`;
    }
  }

  private pad2(n: number): string {
    let result = n.toString();
    if (result.length < 2) {
      result = '0' + result;
    }
    return result;
  }
}
