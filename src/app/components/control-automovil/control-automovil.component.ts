import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { TemplateService } from 'src/app/services/template.service';

@Component({
  selector: 'app-control-automovil',
  templateUrl: './control-automovil.component.html',
  styleUrls: ['./control-automovil.component.scss']
})
export class ControlAutomovilComponent implements OnInit {
  automoviles = [];

  constructor(
    public autoS_: ApiService,
    public templateService: TemplateService
  ) { }

  ngOnInit() {
    this.autoS_.getAutos().subscribe(
      (res: any) => {
        this.automoviles = res.autos;
      },
      (err: any) => console.log(err)
    );

    this.templateService.broadcastTemplateChange('Automovil');
  }

  addAuto() {
    this.autoS_.addAuto().subscribe(
      (res: any) => {
        this.automoviles.push(res.auto);
      },
      (err: any) => console.log(err)
    );
  }

  actualizaAutomoviles(auto) {
    const idx = this.automoviles.indexOf(
      this.automoviles.find(a => a.clave === auto.clave)
    );

    this.automoviles[idx] = auto;
  }
}
