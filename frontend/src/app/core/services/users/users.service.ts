import {Injectable} from '@angular/core';
import {ApiService} from '../../../api.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private api: ApiService) {
  }

  fetchAllUsers() {
    const requestBody = {
      query: `
        query {
          users {
            _id,
            email,
            name,
            surname,
            birthDate,
            driverLicenseNumber,
            role
          }
        }
      `
    };
    return this.api.post(requestBody).pipe(map(({data}) => data.users));
  }
}
