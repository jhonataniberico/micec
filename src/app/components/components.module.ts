import { ModalConfirmacionComponent } from './../shared/components/modal-confirmacion/modal-confirmacion.component';
import { ModalHorarioComponent } from './../shared/components/modal-horario/modal-horario.component';
import { MailService } from './../services/mail.service';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ComponentsRoutingModule } from './components-routing.module';
import { DialogDataExampleDialog, IndexComponent } from './index/index.component';
import { PersonaService } from '../services/persona.service';
import { ReservaTelecitaMedicaComponent } from './reserva-telecita-medica/reserva-telecita-medica.component';
import { PerfilProfesionalComponent } from './perfil-profesional/perfil-profesional.component';
import { AvisoSesionComponent } from './aviso-sesion/aviso-sesion.component';
import { CrearCuentaIComponent } from './crear-cuenta-i/crear-cuenta-i.component';
import { EspecialidadService } from '../services/especialidad.service';
import { ProfesionalService } from '../services/profesional.service';
import { PipesModule } from '../pipes/pipes.module';
import { CrearCuentaIiComponent } from './crear-cuenta-ii/crear-cuenta-ii.component';
import { CrearCuentaIiiComponent } from './crear-cuenta-iii/crear-cuenta-iii.component';
import { ConfirmarReservaComponent } from './confirmar-reserva/confirmar-reserva.component';
import { TerminosCondicionesComponent } from './terminos-condiciones/terminos-condiciones.component';
import { CitaService } from '../services/cita.service';
import { SecurityService } from '../services/security.service';
import { StepperReservaComponent } from './stepper-reserva/stepper-reserva.component';
import { MedicoComponent } from './medico/medico.component';
import { ExperienciasComponent } from './experiencias/experiencias.component';
import { OpinionesComponent } from './opiniones/opiniones.component';
import { OpinionPacienteComponent } from './opinion-paciente/opinion-paciente.component';
import { MediosDePagoComponent } from './medios-de-pago/medios-de-pago.component';
import { FiltroBusquedaComponent } from './filtro-busqueda/filtro-busqueda.component';
import { CrearCuentaComponent } from './crear-cuenta/crear-cuenta.component';
// import { CaptchaComponent } from '../shared/components/recaptcha/captcha.component'; 
// import { RecaptchaModule } from 'ng-recaptcha'; 



@NgModule({
  imports: [
    SharedModule,
    ComponentsRoutingModule,
    PipesModule,
   // RecaptchaModule.forRoot()
  ],
  declarations: [
    IndexComponent,
    ReservaTelecitaMedicaComponent,
    PerfilProfesionalComponent,
    AvisoSesionComponent,
    CrearCuentaIComponent,
    CrearCuentaIiComponent,
    CrearCuentaIiiComponent,
    ConfirmarReservaComponent,
    TerminosCondicionesComponent,
    StepperReservaComponent,
    MedicoComponent,
    ExperienciasComponent,
    OpinionesComponent,
    OpinionPacienteComponent,
    MediosDePagoComponent,
    FiltroBusquedaComponent,
    CrearCuentaComponent,
    DialogDataExampleDialog

   // CaptchaComponent

  ],
  entryComponents: [
    PerfilProfesionalComponent,
    DialogDataExampleDialog,
    ModalHorarioComponent,
    ModalConfirmacionComponent
  ],
  providers: [
    PersonaService,
    EspecialidadService,
    ProfesionalService,
    CitaService,
    SecurityService,
    MailService
  ]
})
export class ComponentsModule { }
