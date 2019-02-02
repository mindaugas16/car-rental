import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BreadcrumbComponent} from './breadcrumb/breadcrumb.component';
import {RoleVisibilityDirective} from './directives/role-visibility/role-visibility.directive';
import {DialogModalComponent} from './dialog-modal/dialog-modal.component';
import {ClickStopPropagationDirective} from './directives/click-stop-propagation/click-stop-propagation.directive';
import {RentStatusPipe} from '../core/pipes/rent-status.pipe';

@NgModule({
  declarations: [
    BreadcrumbComponent,
    RoleVisibilityDirective,
    DialogModalComponent,
    ClickStopPropagationDirective,
    RentStatusPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BreadcrumbComponent,
    RoleVisibilityDirective,
    DialogModalComponent,
    ClickStopPropagationDirective,
    RentStatusPipe
  ],
  entryComponents: [DialogModalComponent]
})
export class SharedModule {
}
