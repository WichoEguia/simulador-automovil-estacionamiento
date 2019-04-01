import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-panel-estacionamiento-auto',
  templateUrl: 'panel-estacionamiento-auto.component.html',
  styleUrls: ['./panel-estacionamiento-auto.component.scss']
})
export class PanelEstacionamientoAutoComponent implements OnInit {
  @Input() auto;
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

  selectCajon(idx) {
    for (let i = 0; i < this.estacionamiento.length; i++) {
      this.estacionamiento[i].estatus = 'disponible';
    }

    this.estacionamiento[idx].estatus = 'seleccionado';
  }
}
