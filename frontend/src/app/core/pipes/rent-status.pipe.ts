import { Pipe, PipeTransform } from '@angular/core';
import {RentStatuses} from '../../shared/enums/rent-status.enum';

@Pipe({
  name: 'rentStatusPipe'
})
export class RentStatusPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    switch (value) {
      case RentStatuses.NONPAYED:
        return 'Neapmokėta';
      case RentStatuses.PAYED:
        return 'Apmokėkta';
      case RentStatuses.CANCELED:
        return 'Atšaukta';
      case RentStatuses.COMPLETED:
        return 'Pasibaigusi';
    }
    return null;
  }

}
