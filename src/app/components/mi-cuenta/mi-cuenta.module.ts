import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MiCuentaRoutingModule } from './mi-cuenta-routing.module';
import { MiCuentaContentComponent } from './mi-cuenta-content/mi-cuenta-content.component';
import { SharedModule } from '../../shared/shared.module';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { CitaMedicaComponent } from './cita-medica/cita-medica.component';
import { ModalPasswordComponent } from './perfil-usuario/modal-password/modal-password.component';
import { ModalConfirmacionComponent } from './perfil-usuario/modal-confirmacion/modal-confirmacion.component';

@NgModule({
  imports: [
    CommonModule,
    MiCuentaRoutingModule,
    SharedModule
  ],
  entryComponents: [ModalPasswordComponent, ModalConfirmacionComponent],
  declarations: [MiCuentaContentComponent, PerfilUsuarioComponent, CitaMedicaComponent, ModalPasswordComponent, ModalConfirmacionComponent]
})
export class MiCuentaModule { }
