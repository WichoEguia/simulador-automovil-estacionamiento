import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

// Configuracion sockets
import { SocketIoModule, SocketIoConfig } from "ngx-socket-io";
const config: SocketIoConfig = { url: "http://localhost:3000", options: {} };

// Rutas
import { AppRoutingModule } from './app.routes';

// Providers
import { WebSocketService } from "./services/web-socket.service";

// Componentes
import { AppComponent } from "./app.component";
import { ControlAutomovilComponent } from './components/control-automovil/control-automovil.component';
import { PanelEstacionamientoComponent } from './components/panel-estacionamiento/panel-estacionamiento.component';
import { NavegacionComponent } from './template/navegacion/navegacion.component';

@NgModule({
  declarations: [
    AppComponent,
    ControlAutomovilComponent,
    PanelEstacionamientoComponent,
    NavegacionComponent,
  ],
  imports: [
    BrowserModule,
    SocketIoModule.forRoot(config),
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    WebSocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
