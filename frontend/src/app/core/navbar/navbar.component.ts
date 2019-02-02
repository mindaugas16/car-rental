import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {User} from '../models/user.model';
import {UserRoleEnum} from '../../shared/enums/user-role.enum';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  logged: boolean;
  user: User;
  roles = UserRoleEnum;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.user = AuthService.getRealUser();
    this.authService.authenticated().subscribe((auth) => {
      this.logged = auth;
      if (this.logged) {
        this.user = AuthService.getRealUser();
      }
    });
  }

  onLogout() {
    this.authService.logout();
    this.user = null;
  }

}
