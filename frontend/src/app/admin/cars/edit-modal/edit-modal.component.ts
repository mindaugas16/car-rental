import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {CarModel} from '../../../cars/car.model';
import {CarService} from '../../../cars/car.service';
import {CarCategory} from '../../../shared/enums/car-category.enum';
import {LocationService} from '../../../core/services/location/location.service';

@Component({
  selector: 'app-admin-cars-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss']
})
export class EditModalComponent implements OnInit {
  @Input() car?: CarModel;

  @Output() update: EventEmitter<any> = new EventEmitter();

  form: FormGroup;

  categories = CarCategory;
  locations;

  constructor(public activeModal: NgbActiveModal,
              private carService: CarService,
              private locationService: LocationService) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      brand: new FormControl(this.car ? this.car.brand : null, [Validators.required]),
      model: new FormControl(this.car ? this.car.model : null, [Validators.required]),
      productionYear: new FormControl(this.car ? this.car.productionYear : null, [Validators.required]),
      category: new FormControl(this.car ? this.car.category : null, [Validators.required]),
      color: new FormControl(this.car ? this.car.color : null, []),
      mileage: new FormControl(this.car ? this.car.mileage : null, []),
      priceMin: new FormControl(this.car ? this.car.priceMin : null, []),
      description: new FormControl(this.car ? this.car.description : null, []),
      location: new FormControl(this.car && this.car.location ? this.car.location._id : null, []),
    });
    this.locationService.fetchLocations().subscribe(locations => {
      this.locations = locations;
    });
  }

  onAdd() {
    this.carService.create(this.form.value).subscribe(() => {
      this.activeModal.close();
      this.update.emit();
    });
  }

  onUpdate() {
    this.carService.update(this.car._id.toString(), this.form.value).subscribe(() => {
      this.activeModal.close();
      this.update.emit();
    });
  }
}
