import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ControlAutomovilComponent } from './components/control-automovil/control-automovil.component';
import { PanelEstacionamientoComponent } from './components/panel-estacionamiento/panel-estacionamiento.component';

const routes: Routes = [
    { path: 'control-automovil', component: ControlAutomovilComponent },
    { path: 'panel-estacionamiento', component: PanelEstacionamientoComponent },
    { path: '**', pathMatch: 'full', redirectTo: '/control-automovil' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
