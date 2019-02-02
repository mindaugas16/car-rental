import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../core/services/users/users.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UserEditModalComponent} from '../users/user-edit-modal/user-edit-modal.component';
import {RentService} from '../../core/services/rent/rent.service';

@Component({
  selector: 'app-admin-rents',
  templateUrl: './rents.component.html',
  styleUrls: ['./rents.component.scss']
})
export class RentsComponent implements OnInit {

  rows = [];
  columns = [
    {name: 'ID', prop: '_id'},
    {name: 'Car', prop: 'car'},
    {name: 'User', prop: 'user'},
    {name: 'pickUpLocation', prop: 'pickUpLocation'},
    {name: 'dropOffLocation', prop: 'dropOffLocation'},
    {name: 'status', prop: 'status'},
    {name: 'price', prop: 'price'},
    {name: 'Action'},
  ];

  loadingIndicator = true;
  reorderable = true;

  constructor(private rentService: RentService,
              private modalService: NgbModal) {
  }

  ngOnInit() {
    this.fetch();
  }

  fetch() {
    this.rentService.fetchAllRents().subscribe((rents) => {
      console.log(rents);
      this.rows = rents;
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

  generateSummary() {
    this.rentService.generatePdfSummary(this.rows);
  }
}
