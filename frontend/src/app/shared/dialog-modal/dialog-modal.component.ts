import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dialog-modal',
  templateUrl: './dialog-modal.component.html',
  styleUrls: ['./dialog-modal.component.scss']
})
export class DialogModalComponent implements OnInit {
  @Input() title?: string;
  @Input() text?: string;
  @Input() buttons?: { title: string, action?: Function, cssClasses?: string } = {title: null, action: () => {}, cssClasses: null};

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
  }

}
