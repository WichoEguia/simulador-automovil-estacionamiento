import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-panel-estacionamiento-auto',
  templateUrl: 'panel-estacionamiento-auto.component.html',
  styleUrls: ['./panel-estacionamiento-auto.component.scss']
})
export class PanelEstacionamientoAutoComponent implements OnInit {
  @Input() auto;

  @Output() autoActualizado: EventEmitter<any> = new EventEmitter();

  estacionamiento = [];

  constructor(
    public api: ApiService
  ) { }

  ngOnInit() {
    this.api.getEstacionamiento().subscribe(
      (res: any) => this.estacionamiento = res.estacionamiento,
      (err: any) => console.log(err)
    );
  }

  selectCajon(auto, idx) {
    if (auto.estacionado) { return 0; }
    if (this.estacionamiento[idx].estatus === 'ocupado') { return 0; }

    const autosSeleccionados = this.estacionamiento.filter(cjn => cjn.estatus === 'seleccionado');
    for (let i = 0; i < autosSeleccionados.length; i++) {
      autosSeleccionados[i].estatus = 'disponible';
    }

    this.estacionamiento[idx].estatus = 'seleccionado';
  }

  ocuparCajon(auto) {
    let cajon = this.estacionamiento.find(cjn => cjn.estatus === 'seleccionado');

    if (!cajon) {
      cajon = this.estacionamiento.find(cjn => cjn.clave === auto.cajonAsignado);
    }

    this.api.ocuparCajonEstacionamiento(auto, cajon).subscribe(
      (res: any) => {
        const idx = this.estacionamiento.indexOf(cajon);
        this.estacionamiento[idx] = res.cajon;
        this.autoActualizado.emit(res.auto);
      },
      (err: any) => console.log(err)
    );
  }
}
