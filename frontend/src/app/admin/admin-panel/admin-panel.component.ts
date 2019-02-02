import {Component, OnInit} from '@angular/core';
import {RentService} from '../../core/services/rent/rent.service';
import {RentModel} from '../../core/models/rent.model';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  constructor(private rentService: RentService) {
  }

  public lineChartData: Array<any> = [
    {data: [1, 3, 2, 5, 9, 2, 1], label: 'Nuomų skaičius'},
  ];
  public lineChartLabels: Array<any> =
    ['Pirmadienis', 'Antradienis', 'Trečiadienis', 'Ketvirtadienis', 'Penktadienis', 'Šeštadienis', 'Sekmadienis'];
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';

  ngOnInit() {
    this.rentService.fetchAllRents().subscribe((rents: RentModel[]) => {
    });
  }

}
