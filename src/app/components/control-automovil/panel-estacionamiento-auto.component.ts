import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { WebSocketService } from 'src/app/services/web-socket.service';

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
    private api: ApiService,
    private wsService: WebSocketService
  ) { }

  ngOnInit() {
    this.api.getEstacionamiento().subscribe(
      (res: any) => this.estacionamiento = res.estacionamiento,
      (err: any) => console.log(err)
    );

    this.escucharCambiosEstacionamiento();
  }

  selectCajon(auto, idx) {
    if (auto.estacionado || auto.salida != null) { return 0; }
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
        this.actualizaEstacionamiento(res.cajon);
      },
      (err: any) => console.log(err)
    );
  }

  dejarCajon(auto) {
    const cajon = this.estacionamiento.find(cjn => cjn.ocupante === auto.clave);

    this.api.dejarCajonEstacionamiento(auto, cajon).subscribe(
      (res: any) => {
        const idx = this.estacionamiento.indexOf(cajon);
        this.estacionamiento[idx] = res.cajon;
        this.autoActualizado.emit(res.auto);
        this.actualizaEstacionamiento(res.cajon);
      },
      (err: any) => console.log(err)
    );
  }

  actualizaEstacionamiento(cajon) {
    this.wsService.emit('actualiza-estacionamiento', cajon);
  }

  private escucharCambiosEstacionamiento() {
    this.wsService.listen('actualiza-estacionamiento-x2').subscribe(
      (cajon: any) => {
        // Encontrar index de cajon modificado
        const idx = this.estacionamiento.findIndex(c => c.clave === cajon.clave);
        this.estacionamiento[idx] = cajon;
      }
    );
  }
}
