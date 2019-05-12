import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ControlAutomovilComponent } from './components/control-automovil/control-automovil.component';
import { PanelEstacionamientoComponent } from './components/panel-estacionamiento/panel-estacionamiento.component';
import { ControlAutomovilCronometradoComponent } from './components/control-automovil-cronometrado/control-automovil-cronometrado.component';

const routes: Routes = [
    { path: 'control-automovil-cronometrado', component: ControlAutomovilCronometradoComponent },
    { path: 'control-automovil-manual', component: ControlAutomovilComponent },
    { path: 'panel-estacionamiento', component: PanelEstacionamientoComponent },
    { path: '**', pathMatch: 'full', redirectTo: '/panel-estacionamiento' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
