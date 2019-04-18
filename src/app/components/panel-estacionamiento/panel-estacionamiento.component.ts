import { Component, OnInit } from '@angular/core';
import { TemplateService } from 'src/app/services/template.service';
import { ApiService } from 'src/app/services/api.service';
import { WebSocketService } from 'src/app/services/web-socket.service';

@Component({
  selector: 'app-panel-estacionamiento',
  templateUrl: './panel-estacionamiento.component.html',
  styleUrls: ['./panel-estacionamiento.component.scss']
})
export class PanelEstacionamientoComponent implements OnInit {
  public estacionamiento = [];

  constructor(
    private templateService: TemplateService,
    private api: ApiService,
    private wsService: WebSocketService
  ) {}

  ngOnInit() {
    this.templateService.broadcastTemplateChange('Estacionamiento');

    this.api.getEstacionamiento().subscribe(
      (res: any) => (this.estacionamiento = res.estacionamiento),
      (err: any) => console.log(err)
    );

    this.escucharCambiosEstacionamiento();
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
