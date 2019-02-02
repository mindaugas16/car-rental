import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  post(body, headers?): Observable<any> {
    return this.request('POST', body);
  }

  private request(method, body) {
    return this.http.request(method, environment.api, {body, headers: {'Content-Type': 'application/json'}}).pipe(map(
      res => {
        return res;
      },
      err => {
        this.handleError(err);
      }
    ));
  }

  private handleError(error) {
    /* Error handling is supposed to be here */
    return error;
  }
}
