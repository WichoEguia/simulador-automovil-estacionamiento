import { Component, OnInit } from '@angular/core';
import { TemplateService } from 'src/app/services/template.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-panel-estacionamiento',
  templateUrl: './panel-estacionamiento.component.html',
  styleUrls: ['./panel-estacionamiento.component.scss']
})
export class PanelEstacionamientoComponent implements OnInit {
  estacionamiento = [];

  constructor(
    public templateService: TemplateService,
    public api: ApiService
  ) {}

  ngOnInit() {
    this.templateService.broadcastTemplateChange('Estacionamiento');

    this.api.getEstacionamiento().subscribe(
      (res: any) => (this.estacionamiento = res.estacionamiento),
      (err: any) => console.log(err)
    );
  }
}
