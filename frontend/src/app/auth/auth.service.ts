import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ApiService} from '../api.service';
import {map, tap} from 'rxjs/operators';
import {User} from '../core/models/user.model';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authenticated$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  static getRealUser(): User {
    return JSON.parse(localStorage.getItem('currentUser')) || null;
  }

  static getToken(): string {
    const user: User = AuthService.getRealUser();
    return user.token;
  }

  constructor(private api: ApiService,
              private router: Router) {
    this.authenticated$.next(this.isAuthenticated());
  }

  login(email: string, password: string): Observable<any> {
    const requestBody = {
      query: `
        query {
          login(email: "${email}", password: "${password}") {
            userId
            token
            tokenExpiration
            email
            role
            name
            surname
          }
        }
      `
    };
    return this.api.post(requestBody).pipe(
      map(({data}) => data.login),
      tap((user) => {
        console.log(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.authenticated$.next(true);
      }));
  }

  createUser(user: User) {
    const {email, password, name, surname, birthDate, driverLicenseNumber} = user;
    const requestBody = {
      query: `
          mutation {
            createUser(userInput: {
            email: "${email}", password: "${password}", name: "${name}", surname: "${surname}",
             birthDate: "${birthDate}",driverLicenseNumber: ${driverLicenseNumber}, role: 0}) {
              _id
              email
            }
          }
        `
    };
    return this.api.post(requestBody);
  }

  getUser(): User {
    return AuthService.getRealUser();
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.authenticated$.next(false);
    this.router.navigate(['/auth/login']);
  }

  authenticated(): Observable<boolean> {
    return this.authenticated$.asObservable();
  }

  isAuthenticated() {
    return !!AuthService.getRealUser();
  }


}
