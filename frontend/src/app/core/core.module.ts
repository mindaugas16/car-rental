import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {NavbarComponent} from './navbar/navbar.component';
import {HomeComponent} from './home/home.component';
import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {LocationService} from './services/location/location.service';
import {RentService} from './services/rent/rent.service';
import {InvoiceService} from './services/invoice/invoice.service';
import {AgmCoreModule} from '@agm/core';
import {NgSelectModule} from '@ng-select/ng-select';
import {AngularFontAwesomeModule} from 'angular-font-awesome';

@NgModule({
  declarations: [
    NavbarComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    FormsModule,
    SharedModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC1eNa4D2lJCvqPhdzuSQuUVlzU4mdjn4U'
    }),
    NgSelectModule,
    AngularFontAwesomeModule
  ],
  providers: [LocationService, RentService, InvoiceService, DatePipe],
  exports: [NavbarComponent]
})
export class CoreModule {
}
