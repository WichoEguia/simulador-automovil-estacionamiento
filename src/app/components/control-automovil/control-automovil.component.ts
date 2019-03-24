import { Component, OnInit } from '@angular/core';
import { AutomovilService } from './../../services/automovil.service';

@Component({
  selector: 'app-control-automovil',
  templateUrl: './control-automovil.component.html',
  styleUrls: ['./control-automovil.component.scss']
})
export class ControlAutomovilComponent implements OnInit {
  automoviles = [];

  constructor(
    public autoS_: AutomovilService
  ) { }

  ngOnInit() {
    this.autoS_.getAutos().subscribe(
      (res: any) => this.automoviles = res.autos,
      (err: any) => console.log(err)
    );
  }

  addAuto() {
    this.autoS_.addAuto().subscribe(
      (res: any) => this.automoviles = res.autos,
      (err: any) => console.log(err)
    );
  }
}
