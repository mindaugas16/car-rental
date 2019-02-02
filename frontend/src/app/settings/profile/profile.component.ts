import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
form: FormGroup;
  constructor() { }

  ngOnInit() {
    this.form = new FormGroup({
      oldPassword: new FormControl(''),
      newPassword: new FormControl(''),
    });
  }

}
