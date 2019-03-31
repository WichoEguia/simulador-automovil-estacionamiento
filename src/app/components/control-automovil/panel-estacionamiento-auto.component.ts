import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-panel-estacionamiento-auto',
  template: `
    <p>
      panel-estacionamiento-auto works!
    </p>
  `,
  styleUrls: ['./panel-estacionamiento-auto.component.scss']
})
export class PanelEstacionamientoAutoComponent implements OnInit {
  estacionamiento = [];

  constructor(
    public estacionamientoS_: ApiService
  ) { }

  ngOnInit() {
    this.estacionamientoS_.getEstacionamiento().subscribe(
      (res: any) => this.estacionamiento = res.estacionamiento,
      (err: any) => console.log(err)
    );
  }
}
