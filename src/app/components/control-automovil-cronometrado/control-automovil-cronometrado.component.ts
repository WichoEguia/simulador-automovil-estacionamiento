import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { TemplateService } from 'src/app/services/template.service';
import { Timer } from 'easytimer.js';
import { WebSocketService } from 'src/app/services/web-socket.service';

@Component({
  selector: 'app-control-automovil-cronometrado',
  templateUrl: './control-automovil-cronometrado.component.html',
  styleUrls: ['./control-automovil-cronometrado.component.scss']
})
export class ControlAutomovilCronometradoComponent implements OnInit, OnDestroy {
  private timer: Timer = new Timer();
  public automoviles = [];
  public estacionamiento = [];

  public cronometro: string = '00:00:00';

  constructor(
    public api: ApiService,
    public templateService: TemplateService,
    public wsService: WebSocketService
  ) { }

  ngOnInit() {
    this.getAutomoviles();
    this.getEstacionamiento();

    this.escucharCambiosEstacionamiento();

    this.timer.start();
    this.timer.addEventListener('secondTenthsUpdated', () => {
      this.cronometro = this.timer.getTimeValues().toString(['hours', 'minutes', 'seconds']);

      const segundos: number = this.timer.getTimeValues().seconds;

      // Cada 3 segundos llega un nuevo auto
      if (segundos % 3 === 0) {
        // Revisa si estacionamiento tiene lugar
        const cjs_disp = this.estacionamiento.filter(cjn => cjn.estatus !== 'ocupado');
        if (cjs_disp.length > 0) {
          // Creando proceso asincrono
          (async () => {
            try {
              // Creando auto
              const { auto } = <any>(await this.api.addAuto().toPromise());
              this.automoviles.push(auto);

              // Ocupar cajón
              const cajon_seleccionado = this.estacionamiento.find(cjn => cjn.clave === auto.cajonAsignado);
              const { cajon } = <any>(await this.api.ocuparCajonEstacionamiento(auto, cajon_seleccionado).toPromise());
              const idx_cajon = this.estacionamiento.indexOf(cajon_seleccionado);
              this.estacionamiento[idx_cajon] = cajon;
              const idx_auto = this.estacionamiento.indexOf(auto);
              this.automoviles[idx_auto] = auto;

              // Actualiza panel de estacionamiento
              this.actualizaEstacionamiento(cajon);

              // Obtener numero aleatorio entre 5 y 10
              // para establecer el tiempo que el auto ocupa el cajón
              const duracion = Math.floor(Math.random() * 5) + 5;
              setTimeout(async () => {
                // Dejar el cajon cuando el tiempo que ocupa el auto termina
                let cajon_sale = await this.api.dejarCajonEstacionamiento(auto, cajon).toPromise();
                cajon_sale = (<any>cajon_sale).cajon;

                // Actualiza panel de estacionamiento
                this.actualizaEstacionamiento(cajon_sale);
              }, duracion * 1000);
            } catch (err) {
              console.log('El cajon está siendo ocupado, volviendo a buscar');
            }
          })();
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.timer.stop();
  }

  getAutomoviles() {
    this.api.getAutos().subscribe(
      (res: any) => {
        this.automoviles = res.autos;
      },
      (err: any) => console.log(err)
    );
  }

  getEstacionamiento() {
    this.api.getEstacionamiento().subscribe(
      (res: any) => {
        this.estacionamiento = res.estacionamiento;
      },
      (err: any) => console.log(err)
    );
  }

  ocuparCajonEstacionamiento(auto, cajon) {
    this.api.ocuparCajonEstacionamiento(auto, cajon).subscribe(
      (res: any) => {
        const idx = this.estacionamiento.indexOf(cajon);
        this.estacionamiento[idx] = res.cajon;
        // this.autoActualizado.emit(res.auto);
        this.actualizaEstacionamiento(res.cajon);
      },
      (err: any) => console.log(err)
    );
  }

  actualizaEstacionamiento(cajon) {
    this.wsService.emit('actualiza-estacionamiento', cajon);
  }

  escucharCambiosEstacionamiento() {
    this.wsService.listen('actualiza-estacionamiento-x2').subscribe(
      (cajon: any) => {
        // Encontrar index de cajon modificado
        const idx = this.estacionamiento.findIndex(c => c.clave === cajon.clave);
        this.estacionamiento[idx] = cajon;
      }
    );
  }
}
