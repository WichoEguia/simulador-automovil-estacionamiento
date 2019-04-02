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
      this.estacionamiento[i].estatus = 'disponible';
    }

    this.estacionamiento[idx].estatus = 'seleccionado';
  }

  ocuparCajon(auto) {
    const cajon = this.estacionamiento.find(cjn => cjn.estatus === 'seleccionado');
    this.api.ocuparCajonEstacionamiento(auto.clave, cajon.clave).subscribe(
      (res: any) => {
        this.estacionamiento = res.respuesta_cajon.estacionamiento;
        this.autoActualizado.emit(res.respuesta_auto.auto);
      },
      (err: any) => console.log(err)
    );
  }
}
