import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

// Configuracion sockets
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

// Rutas
import { AppRoutingModule } from './app.routes';

// Providers
import { WebSocketService } from './services/web-socket.service';
import { TemplateService } from './services/template.service';

// Componentes
import { AppComponent } from './app.component';
import { ControlAutomovilComponent } from './components/control-automovil/control-automovil.component';
import { PanelEstacionamientoComponent } from './components/panel-estacionamiento/panel-estacionamiento.component';
import { NavegacionComponent } from './template/navegacion/navegacion.component';
import { FooterComponent } from './template/footer/footer.component';
import { SidebarToggleComponent } from './template/sidebar-toggle/sidebar-toggle.component';
import { SidebarComponent } from './template/sidebar/sidebar.component';
import { PanelEstacionamientoAutoComponent } from './components/control-automovil/panel-estacionamiento-auto.component';

@NgModule({
  declarations: [
    AppComponent,
    ControlAutomovilComponent,
    PanelEstacionamientoComponent,
    NavegacionComponent,
    FooterComponent,
    SidebarToggleComponent,
    SidebarComponent,
    PanelEstacionamientoAutoComponent,
  ],
  imports: [
    BrowserModule,
    SocketIoModule.forRoot(config),
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    FormsModule
  ],
  providers: [
    WebSocketService,
    TemplateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
