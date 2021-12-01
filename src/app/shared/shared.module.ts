import { ModalConfirmacionComponent } from './components/modal-confirmacion/modal-confirmacion.component';
import { HorarioCitaComponent } from './components/horario-cita/horario-cita.component';
import { ModalHorarioComponent } from './components/modal-horario/modal-horario.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { ValidatorsMessagesComponent } from './helpers/custom-validators/validators-messages/validators-messages.component';
import { SliderFotosComponent } from './components/slider-fotos/slider-fotos.component';
import { SliderVideosComponent } from './components/slider-videos/slider-videos.component';
import { StarComponent } from './components/star/star.component';
import { SpinnerComponent } from '../shared/components/spinner/spinner.component';

const IMPORTS = [
  CommonModule,
  MaterialModule
]

const EXPORTS = [
  CommonModule,
  MaterialModule,
  ValidatorsMessagesComponent,
  ModalHorarioComponent,
  HorarioCitaComponent,
  StarComponent,
  SliderFotosComponent,
  SliderVideosComponent,
  SpinnerComponent,
  ModalConfirmacionComponent
]

const DECLARATIONS = [
  ValidatorsMessagesComponent,
  ModalHorarioComponent,
  HorarioCitaComponent,
  StarComponent,
  SliderFotosComponent,
  SliderVideosComponent,
  SpinnerComponent,
  ModalConfirmacionComponent
]

@NgModule({
  imports: IMPORTS,
  exports: EXPORTS,
  declarations: DECLARATIONS
})
export class SharedModule { }
