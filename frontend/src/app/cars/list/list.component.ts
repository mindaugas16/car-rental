import {Component, OnInit} from '@angular/core';
import {CarModel} from '../car.model';
import {CarService} from '../car.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {RentModalComponent} from '../rent-modal/rent-modal.component';
import {AuthService} from '../../auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  cars: CarModel[] = [];

  constructor(private carService: CarService,
              private modalService: NgbModal,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.getAllCars();
  }

  getAllCars() {
    this.carService.fetchCars().subscribe((cars) => {
      this.cars = cars;
    });
  }

  onRent(car: CarModel) {
    if (this.authService.isAuthenticated()) {
      const modalRef = this.modalService.open(RentModalComponent, {size: 'lg'});
      modalRef.componentInstance.car = car;
    } else {
      this.router.navigate(['/auth/login']);
    }
  }

}
