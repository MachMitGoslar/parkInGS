import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'distance'
})
export class DistancePipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {


        if (value && value >= 1000)
            return Math.floor(value / 1000).toString() + 'km';

        if (value && value < 1000)
            return Math.floor(value).toString() + 'm';

        else 
        return ""; 
   }

}
