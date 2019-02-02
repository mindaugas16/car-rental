import {Component, OnInit} from '@angular/core';
import {CarService} from '../../cars/car.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EditModalComponent} from './edit-modal/edit-modal.component';
import {DialogModalComponent} from '../../shared/dialog-modal/dialog-modal.component';
import {CarCategory} from '../../shared/enums/car-category.enum';

@Component({
  selector: 'app-admin-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})
export class CarsComponent implements OnInit {
  rows = [];
  columns = [
    {name: 'Brand', prop: 'brand'},
    {name: 'Model', prop: 'model'},
    {name: 'Category', prop: 'category'},
    {name: 'Production year', prop: 'productionYear'},
    {name: 'Mileage', prop: 'mileage'},
    {name: 'Color', prop: 'color'},
    {name: 'Location', prop: 'location'},
    {name: 'PriceMin', prop: 'priceMin'},
    {name: 'description', prop: 'description'},
    {name: 'Action'},
  ];

  loadingIndicator = true;
  reorderable = true;

  constructor(private carService: CarService,
              private modalService: NgbModal) {
  }

  ngOnInit() {
    this.fetch();
  }

  fetch() {
    this.carService.fetchCars().subscribe((cars) => {
      this.rows = cars;
    });
  }

  onEditModal(item?) {
    const modalRef = this.modalService.open(EditModalComponent);
    modalRef.componentInstance.car = item || null;
    modalRef.componentInstance.update.subscribe(() => {
      this.fetch();
    });
  }

  onDelete(item) {
    const modalRef = this.modalService.open(DialogModalComponent);
    modalRef.componentInstance.title = 'Ar tikrai norite ištrinti automobilio įrašą?';
    modalRef.componentInstance.buttons = [
      {
        title: 'Ištrinti', action: () => {
          this.carService.delete(item._id).subscribe(() => {
            this.fetch();
          });
        }, cssClasses: 'btn btn-danger'
      }, {
        title: 'Atšaukti', cssClasses: 'btn btn-light', action: () => {
        }
      }
    ];
  }

  getCategory(category: CarCategory) {
    switch (category) {
      case CarCategory.SEDAN:
        return 'Sedanas';
      case CarCategory.HATCHBACK:
        return 'Hečbekas';
      case CarCategory.COUPE:
        return 'Kupė';
      case CarCategory.CROSSOVER:
        return 'Visureigis';
      case CarCategory.CABRIOLET:
        return 'Kabrioletas';
    }
  }

  generateSummary() {
    this.carService.generatePdfSummary(this.rows);
  }

}
