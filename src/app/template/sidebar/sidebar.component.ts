import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { TemplateService } from 'src/app/services/template.service';
import swal from 'sweetalert';
import { ApiService } from 'src/app/services/api.service';
import { WebSocketService } from 'src/app/services/web-socket.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  constructor(
    public templateService: TemplateService,
    private apiService: ApiService,
    private socket: WebSocketService
  ) { }

  ngOnInit() {
    this.reiniciarVentana();
  }

  reiniciaData() {
    swal({
      title: '¡Cuidado!',
      text: '¿Seguro de querer reiniciar la información?',
      icon: 'warning',
      dangerMode: true,
      buttons: ['cancelar', 'reiniciar']
    }).then((borrar) => {
      if (borrar) {
        this.apiService.borrarAutos().subscribe(
          (res: any) => {
            console.log(res);

            this.apiService.borrarEstacionamiento().subscribe(
              (res2: any) => {
                console.log(res2);

                this.apiService.generarEstacionamiento().subscribe(
                  (res3: any) => {
                    console.log(res3);

                    swal('La información ha sido reestablecida.', {
                      icon: 'success',
                    }).then(() => {
                      this.socket.emit('recargar');
                    });
                  }
                );
              }
            );
          }
        );
      }
    });
  }

  private reiniciarVentana() {
    this.socket.listen('recargar-pagina').subscribe(() => window.location.reload());
  }
}
