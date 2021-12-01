import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CitaMedicaComponent } from './cita-medica/cita-medica.component';
import { MiCuentaContentComponent } from './mi-cuenta-content/mi-cuenta-content.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';

const routes: Routes = [
  {
    path: '', component: MiCuentaContentComponent, children: [
      {
        path: 'perfil', component: PerfilUsuarioComponent
      },
      {
        path: 'citas', component: CitaMedicaComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MiCuentaRoutingModule { }
