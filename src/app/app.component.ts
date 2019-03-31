import { Component } from '@angular/core';
import { WebSocketService } from './services/web-socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'simuladorAutoApplication';
  sideBarActive = false;

  constructor() { }

  abrirSideBar() {
    this.sideBarActive = ! this.sideBarActive;
  }
}
