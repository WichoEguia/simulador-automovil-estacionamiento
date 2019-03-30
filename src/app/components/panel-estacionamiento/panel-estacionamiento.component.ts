import { Component, OnInit } from '@angular/core';
import { TemplateService } from 'src/app/services/template.service';

@Component({
  selector: 'app-panel-estacionamiento',
  templateUrl: './panel-estacionamiento.component.html',
  styleUrls: ['./panel-estacionamiento.component.scss']
})
export class PanelEstacionamientoComponent implements OnInit {

  constructor(
    public templateService: TemplateService
  ) { }

  ngOnInit() {
    this.templateService.broadcastTemplateChange('Estacionamiento');
  }

}
