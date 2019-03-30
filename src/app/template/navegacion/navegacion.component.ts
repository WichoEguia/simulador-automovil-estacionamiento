import { Component, OnInit } from '@angular/core';
import { TemplateService } from 'src/app/services/template.service';

@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.scss']
})
export class NavegacionComponent implements OnInit {
  constructor(
    public templateService: TemplateService
  ) { }

  ngOnInit() {
  }
}
