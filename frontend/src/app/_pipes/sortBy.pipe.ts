import { Pipe, PipeTransform } from '@angular/core';

/*
  Usage:   value | sortBy:exponent
  Example: {{ 2 | sortBy:'' }}
*/

@Pipe({name: 'sortBy'})

export class SortByPipe implements PipeTransform {
  private defaultSort (a, b) {
      return a > b ? 1 : -1;
  }

  convert_value(type: string) {
    return function(value) {
      if (Array.isArray(value)) {
        return value.length;
      }
      if (type === 'string') {
        return value.toLowerCase();
      }
      if (type === 'number') {
        return +value;
      }
      if (type === 'date') {
        return new Date(value).getTime();
      }
    };
  }

  transform(value: any[], order: string, reverse: boolean, type: string = 'number') {
    const sort_fn = this.defaultSort,
      convert_fn = this.convert_value(type);

    value.sort((a, b) => sort_fn(convert_fn(a[order]), convert_fn(b[order])));
    return reverse ? value.reverse() : value;
  }
}
