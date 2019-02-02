import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {LocationService} from '../../../core/services/location/location.service';
import {User} from '../../../core/models/user.model';
import {UsersService} from '../../../core/services/users/users.service';
import {UserRoleEnum} from '../../../shared/enums/user-role.enum';

@Component({
  selector: 'app-user-edit-modal',
  templateUrl: './user-edit-modal.component.html',
  styleUrls: ['./user-edit-modal.component.scss']
})
export class UserEditModalComponent implements OnInit {
  @Input() user?: User;

  @Output() update: EventEmitter<any> = new EventEmitter();

  form: FormGroup;

  roles = [
    {value: UserRoleEnum.CLIENT, name: 'Client'},
    {value: UserRoleEnum.MODERATOR, name: 'Moderator'},
    {value: UserRoleEnum.ADMIN, name: 'Admin'},
  ];

  constructor(public activeModal: NgbActiveModal,
              private usersService: UsersService,
              private locationService: LocationService) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(this.user ? this.user.email : null, [Validators.required]),
      name: new FormControl(this.user ? this.user.name : null, [Validators.required]),
      surname: new FormControl(this.user ? this.user.surname : null, [Validators.required]),
      birthDate: new FormControl(this.user ? this.user.birthDate : null, [Validators.required]),
      driverLicenseNumber: new FormControl(this.user ? this.user.driverLicenseNumber : null, []),
      role: new FormControl(this.user ? this.user.role : null, []),
    });
    // this.locationService.fetchLocations().subscribe(locations => {
    //   this.locations = locations;
    // });
  }

  onAdd() {
    // this.userService.create(this.form.value).subscribe(() => {
    //   this.activeModal.close();
    //   this.update.emit();
    // });
  }

  onUpdate() {
    // this.userService.update(this.user._id.toString(), this.form.value).subscribe(() => {
    //   this.activeModal.close();
    //   this.update.emit();
    // });
  }

}
