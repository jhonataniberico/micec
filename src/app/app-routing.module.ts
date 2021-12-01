import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RedirectPageComponent } from './shared/components/redirect-page/redirect-page.component';
import { RedirectConfirmacionComponent } from './shared/components/redirect-confirmacion/redirect-confirmacion.component';
import { IniciarSesionComponent } from './components/iniciar-sesion/iniciar-sesion.component';
import { RedirectOpinionComponent } from './shared/components/redirect-opinion/redirect-opinion.component';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/', pathMatch: 'full'
  },
  {
    path: 'index', loadChildren: './components/components.module#ComponentsModule'
  },
  {
    path: 'redirect-page', component: RedirectPageComponent
  },
  {
    path: 'redirect-confirmacion', component: RedirectConfirmacionComponent
  },
  {
    path: 'iniciar-sesion', component: IniciarSesionComponent
  },
  {
    path: 'redirect-opinion', component: RedirectOpinionComponent
  },
  
  {
    path: 'spinner', component: SpinnerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
