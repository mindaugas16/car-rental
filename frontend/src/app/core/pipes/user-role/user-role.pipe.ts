import { Pipe, PipeTransform } from '@angular/core';
import {UserRoleEnum} from '../../../shared/enums/user-role.enum';

@Pipe({
  name: 'userRole'
})
export class UserRolePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    switch (value) {
      case UserRoleEnum.CLIENT:
        return 'Client';
      case UserRoleEnum.MODERATOR:
        return 'Moderator';
      case UserRoleEnum.ADMIN:
        return 'Admin';
    }
    return null;
  }

}
