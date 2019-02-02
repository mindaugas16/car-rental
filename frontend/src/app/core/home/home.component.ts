import {Component, OnInit} from '@angular/core';
import {CarCategory} from '../../shared/enums/car-category.enum';
import {NgbCalendar, NgbDate} from '@ng-bootstrap/ng-bootstrap';
import {LocationService} from '../services/location/location.service';
import {LocationInterface} from '../models/location.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  selectedLocation;
  locations;

  hoveredDate: NgbDate;

  fromDate: NgbDate;
  toDate: NgbDate;

  carCategories = [
    {value: CarCategory.CABRIOLET, name: 'Kabrioletas'},
    {value: CarCategory.CROSSOVER, name: 'Visureigis'},
    {value: CarCategory.COUPE, name: 'Kupė'},
    {value: CarCategory.HATCHBACK, name: 'Hečbekas'},
    {value: CarCategory.SEDAN, name: 'Sedanas'},
  ];
  selected: { value: CarCategory, name: string }[] = [];

  constructor(calendar: NgbCalendar,
              private locationService: LocationService) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  ngOnInit() {
    this.locationService.fetchLocations().subscribe((locations: LocationInterface[]) => {
      this.locations = locations.map(location => {
        return {value: location._id, name: location.address};
      });
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


}
