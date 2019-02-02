import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminPanelComponent} from './admin-panel/admin-panel.component';
import {AdminRoutingModule} from './admin-routing.module';
import {SharedModule} from '../shared/shared.module';
import {SidebarComponent} from './sidebar/sidebar.component';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {CarsComponent} from './cars/cars.component';
import {EditModalComponent} from './cars/edit-modal/edit-modal.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {UsersComponent} from './users/users.component';
import {UserEditModalComponent} from './users/user-edit-modal/user-edit-modal.component';
import {UserRolePipe} from '../core/pipes/user-role/user-role.pipe';
import {ChartsModule} from 'ng2-charts';
import { RentsComponent } from './rents/rents.component';
import {RentStatusPipe} from '../core/pipes/rent-status.pipe';

@NgModule({
  declarations: [
    AdminPanelComponent,
    SidebarComponent,
    CarsComponent,
    EditModalComponent,
    UserEditModalComponent,
    UsersComponent,
    UserRolePipe,
    RentsComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    NgxDatatableModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule,
    ChartsModule
  ],
  exports: [EditModalComponent, UserEditModalComponent],
  entryComponents: [EditModalComponent, UserEditModalComponent]
})
export class AdminModule {
}
