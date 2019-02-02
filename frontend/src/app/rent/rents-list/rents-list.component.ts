import {Component, OnInit} from '@angular/core';
import {RentService} from '../../core/services/rent/rent.service';
import {RentModel} from '../../core/models/rent.model';
import {RentStatuses} from '../../shared/enums/rent-status.enum';
import {DialogModalComponent} from '../../shared/dialog-modal/dialog-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {InvoiceService} from '../../core/services/invoice/invoice.service';

@Component({
  selector: 'app-rents-list',
  templateUrl: './rents-list.component.html',
  styleUrls: ['./rents-list.component.scss']
})
export class RentsListComponent implements OnInit {
  rents: RentModel[];
  filteredRents: RentModel[];
  rentStatus = RentStatuses;
  rentStatuses = [
    {value: RentStatuses.NONPAYED, name: 'Neapmokėta'},
    {value: RentStatuses.PAYED, name: 'Apmokėta'},
    {value: RentStatuses.CANCELED, name: 'Atšaukta'},
    {value: RentStatuses.COMPLETED, name: 'Pasibaigusi'}];
  selectedStatuses: { value: RentStatuses, name: string }[] = [];

  constructor(private rentService: RentService,
              private modalService: NgbModal,
              private invoiceService: InvoiceService) {
  }

  ngOnInit() {
    this.fetch();
  }

  fetch() {
    this.rentService.fetchUserRents().subscribe((rents) => {
      this.rents = rents.sort(function (a, b) {
        return b.updatedAt - a.updatedAt;
      });
    });
  }

  onStatusChange(rent: RentModel, status: RentStatuses) {
    if (status === RentStatuses.CANCELED) {
      const modalRef = this.modalService.open(DialogModalComponent);
      modalRef.componentInstance.title = 'Ar tikrai norite atšaukti nuomą?';
      modalRef.componentInstance.buttons = [
        {
          title: 'Taip', action: () => {
            this.rentService.updateRent(rent._id, {status}).subscribe(() => {
              this.fetch();
            });
          }, cssClasses: 'btn btn-danger'
        }, {
          title: 'Ne', cssClasses: 'btn btn-light', action: () => {
          }
        }
      ];
    } else {
      this.rentService.updateRent(rent._id, {status}).subscribe(() => {
        this.fetch();
      });
    }
  }


  onDownloadInvoice(rent: RentModel) {
    this.invoiceService.generateInvoice(rent);
  }

  onChange() {
    this.filteredRents = this.rents.filter((rent) => {
      return this.selectedStatuses.find(status => rent.status === status.value);
    });
  }

}
