import {Injectable} from '@angular/core';
import {ApiService} from '../../../api.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  constructor(private api: ApiService) {
  }

  fetchLocations() {
    const requestBody = {
      query: `
        query {
          locations {
            _id,
            address,
            longitude,
            latitude
          }
        }
      `
    };
    return this.api.post(requestBody).pipe(map(({data}) => data.locations));
  }
}
