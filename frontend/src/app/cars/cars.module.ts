import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {ListComponent} from './list/list.component';
import {CarsRoutingModule} from './cars-routing.module';
import {SearchComponent} from './search/search.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CarService} from './car.service';
import {ViewComponent} from './list/view/view.component';
import {SharedModule} from '../shared/shared.module';
import { RentModalComponent } from './rent-modal/rent-modal.component';
import {AngularFontAwesomeModule} from 'angular-font-awesome';

@NgModule({
  declarations: [ListComponent, SearchComponent, ViewComponent, RentModalComponent],
  imports: [
    CommonModule,
    CarsRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AngularFontAwesomeModule
  ],
  providers: [CarService, DatePipe],
  exports: [RentModalComponent],
  entryComponents: [RentModalComponent]
})
export class CarsModule {
}
