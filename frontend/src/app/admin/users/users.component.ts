import { Component, OnInit } from '@angular/core';
import {CarService} from '../../cars/car.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EditModalComponent} from '../cars/edit-modal/edit-modal.component';
import {DialogModalComponent} from '../../shared/dialog-modal/dialog-modal.component';
import {UsersService} from '../../core/services/users/users.service';
import {UserEditModalComponent} from './user-edit-modal/user-edit-modal.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  rows = [];
  columns = [
    {name: 'El. paštas', prop: 'email'},
    {name: 'Vardas', prop: 'name'},
    {name: 'Pavardė', prop: 'surname'},
    {name: 'Gimimo data', prop: 'birthDate'},
    {name: 'Vairuotojo paž. nr.', prop: 'driverLicenseNumber'},
    {name: 'Rolė', prop: 'role'},
    {name: 'Action'},
  ];

  loadingIndicator = true;
  reorderable = true;

  constructor(private usersService: UsersService,
              private modalService: NgbModal) {
  }

  ngOnInit() {
    this.fetch();
  }

  fetch() {
    this.usersService.fetchAllUsers().subscribe((users) => {
      console.log(users);
      this.rows = users;
    });
  }

  onEditModal(item?) {
    const modalRef = this.modalService.open(UserEditModalComponent);
    modalRef.componentInstance.user = item || null;
    modalRef.componentInstance.update.subscribe(() => {
      this.fetch();
    });
  }

  onDelete(item) {
    // const modalRef = this.modalService.open(DialogModalComponent);
    // modalRef.componentInstance.title = 'Ar tikrai norite ištrinti automobilio įrašą?';
    // modalRef.componentInstance.buttons = [
    //   {
    //     title: 'Ištrinti', action: () => {
    //       this.carService.delete(item._id).subscribe(() => {
    //         this.fetch();
    //       });
    //     }, cssClasses: 'btn btn-danger'
    //   }, {
    //     title: 'Atšaukti', cssClasses: 'btn btn-light', action: () => {
    //     }
    //   }
    // ];
  }
}
