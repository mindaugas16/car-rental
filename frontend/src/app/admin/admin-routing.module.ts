import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminPanelComponent} from './admin-panel/admin-panel.component';
import {CarsComponent} from './cars/cars.component';
import {UsersComponent} from './users/users.component';
import {RentsComponent} from './rents/rents.component';

const routes: Routes = [
  {path: '', component: AdminPanelComponent},
  {path: 'cars', component: CarsComponent},
  {path: 'users', component: UsersComponent},
  {path: 'rents', component: RentsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
