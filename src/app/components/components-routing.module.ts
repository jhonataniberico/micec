import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { ReservaTelecitaMedicaComponent } from './reserva-telecita-medica/reserva-telecita-medica.component';
import { AvisoSesionComponent } from './aviso-sesion/aviso-sesion.component';
import { ConfirmarReservaComponent } from './confirmar-reserva/confirmar-reserva.component';
import { TerminosCondicionesComponent } from './terminos-condiciones/terminos-condiciones.component';
import { PerfilProfesionalComponent } from './perfil-profesional/perfil-profesional.component';
import { OpinionPacienteComponent } from './opinion-paciente/opinion-paciente.component';
import { MediosDePagoComponent } from './medios-de-pago/medios-de-pago.component'
import { FiltroBusquedaComponent } from './filtro-busqueda/filtro-busqueda.component';
import { CrearCuentaComponent } from './crear-cuenta/crear-cuenta.component';



const routes: Routes = [
  {
    path: '', component: IndexComponent
  },
  {
    path: 'reserva-telecita-medica', component: ReservaTelecitaMedicaComponent
  },
  {
    path: 'aviso-sesion', component: AvisoSesionComponent
  },
  {
    path: 'confirmar-reserva', component: ConfirmarReservaComponent
  },
  {
    path: 'perfil-profesional', component: PerfilProfesionalComponent
  },
  {
    path: 'termino-condiciones', component: TerminosCondicionesComponent
  },
  {
    path: 'opinion-paciente', component: OpinionPacienteComponent
  },
  {
    path: 'mi-cuenta', loadChildren: './mi-cuenta/mi-cuenta.module#MiCuentaModule'
  },
  {
    path: 'medios-pago', component: MediosDePagoComponent
  },
  {
    path: 'filtro-busqueda', component: FiltroBusquedaComponent
  },
  {
    path: 'crear-cuenta', component: CrearCuentaComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
