import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RentsListComponent} from './rents-list/rents-list.component';
import {RentRoutingModule} from './rent-routing.module';
import {RentStatusPipe} from '../core/pipes/rent-status.pipe';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgSelectModule} from '@ng-select/ng-select';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    RentsListComponent,
  ],
  imports: [
    CommonModule,
    RentRoutingModule,
    NgbModule,
    FormsModule,
    NgSelectModule,
    SharedModule
  ]
})
export class RentModule {
}
