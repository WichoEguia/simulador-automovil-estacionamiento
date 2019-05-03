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
    swal('¿Seguro de querer reiniciar la información?', {
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((borrar) => {
      if (borrar) {
        this.apiService.borrarAutos().subscribe(
          (res: any) => {
            console.log(res);

            this.apiService.borrarEstacionamiento().subscribe(
              (res: any) => {
                console.log(res);

                this.apiService.generarEstacionamiento().subscribe(
                  (res: any) => {
                    console.log(res);

                    swal('La informaci{on ha sido eliminada.', {
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
