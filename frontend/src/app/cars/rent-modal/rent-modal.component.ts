import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal, NgbCalendar, NgbDate} from '@ng-bootstrap/ng-bootstrap';
import {LocationService} from '../../core/services/location/location.service';
import {RentService} from '../../core/services/rent/rent.service';
import {CarModel} from '../car.model';
import {AuthService} from '../../auth/auth.service';
import {CreateRentModel} from '../../core/models/rent.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-rent-modal',
  templateUrl: './rent-modal.component.html',
  styleUrls: ['./rent-modal.component.scss']
})
export class RentModalComponent implements OnInit {
  @Input() car: CarModel;
  hoveredDate: NgbDate;

  fromDate: NgbDate;
  toDate: NgbDate;
  form: FormGroup;
  locations: { _id: string, address: string, longitude: number, latitude: number }[];

  constructor(public activeModal: NgbActiveModal,
              private locationService: LocationService,
              calendar: NgbCalendar,
              private rentService: RentService,
              private router: Router) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  ngOnInit() {
    this.form = new FormGroup({
      pickUpPlace: new FormControl({value: this.car.location._id, disabled: true}, [Validators.required]),
      dropOffPlace: new FormControl('', [Validators.required]),
    });
    this.locationService.fetchLocations().subscribe(locations => {
      this.locations = locations;
    });
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }

  onNext() {
    const rent: CreateRentModel = {
      dropOffLocation: this.form.value.dropOffPlace,
      pickUpLocation: this.car.location._id.toString(),
      startDate: `${this.fromDate.year}-${this.fromDate.month}-${this.fromDate.day}`,
      endDate: `${this.toDate.year}-${this.toDate.month}-${this.toDate.day}`,
      price: this.getDifferenceInDays() * this.car.priceMin * 60
    };
    const user = AuthService.getRealUser();
    this.rentService.createRent(user, this.car, rent).subscribe(() => {
      this.router.navigate(['/rents']);
      this.activeModal.close();
    });
  }

  getDifferenceInDays() {
    const fromDays = this.fromDate.year * 365 + this.fromDate.month * 30 + this.fromDate.day;
    const toDays = this.toDate.year * 365 + this.toDate.month * 30 + this.toDate.day;

    return toDays - fromDays;
  }

}
