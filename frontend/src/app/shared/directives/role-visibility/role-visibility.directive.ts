import {Directive, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {AuthService} from '../../../auth/auth.service';
import {UserRoleEnum} from '../../enums/user-role.enum';

@Directive({
  selector: '[appRoleVisibility]'
})
export class RoleVisibilityDirective implements OnInit {
  @Input('appRoleVisibility') roles: UserRoleEnum[];

  constructor(private authService: AuthService,
              private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef) {
  }

  ngOnInit(): void {
    if (this.roles.find(role => role == this.authService.getUser().role)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

}
