import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RentsListComponent} from './rents-list/rents-list.component';

const routes: Routes = [
  {path: '', component: RentsListComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RentRoutingModule {
}
