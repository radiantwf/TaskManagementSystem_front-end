import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'null_or_empty'
})
export class NullOrEmptyPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (typeof (value) == "undefined" || value === null || value == null || value == "") {
      return arg;
    }
    else {
      return value;
    }
  }
}
