import {Component, OnInit} from '@angular/core';
import {CarService} from '../../car.service';
import {CarModel} from '../../car.model';
import {ActivatedRoute, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {RentModalComponent} from '../../rent-modal/rent-modal.component';
import {AuthService} from '../../../auth/auth.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  car: CarModel;
  currentImageIndex = 0;

  constructor(private carService: CarService,
              private route: ActivatedRoute,
              private authService: AuthService,
              private modalService: NgbModal,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params.pipe(switchMap(({id}) => this.carService.fetchSingleCar(id))).subscribe(car => {
      this.car = car;
    });
  }

  onPrevImage() {
    if (this.currentImageIndex === 0) {
      this.currentImageIndex = this.car.photos.length - 1;
      return;
    }
    this.currentImageIndex--;
  }

  onNextImage() {
    if (this.car.photos && this.car.photos.length && (this.car.photos.length - 1 <= this.currentImageIndex)) {
      this.currentImageIndex = 0;
      return;
    }
    this.currentImageIndex++;
  }

  onGoBack(router: Router) {
    router.navigate(['/cars/list']);
  }

  onRent() {
    if (this.authService.isAuthenticated()) {
      console.log(this.car);
      const modalRef = this.modalService.open(RentModalComponent, {size: 'lg'});
      modalRef.componentInstance.car = this.car;
    } else {
      this.router.navigate(['/auth/login']);
    }
  }

}
