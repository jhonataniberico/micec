import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ToastModule } from 'ng2-toastr';
import {MatDialogModule} from '@angular/material/dialog';
import { IniciarComponent } from './components/iniciar/iniciar.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { CitaService } from './services/cita.service';
import { ComboService } from './services/combo.service';
import { RedirectPageComponent } from './shared/components/redirect-page/redirect-page.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { TokenService } from './services/token.service';
import { UsuarioService } from './services/usuario.service';
import {MatStepperModule} from '@angular/material/stepper';
import {MatIconModule} from '@angular/material/icon';
import { RedirectConfirmacionComponent } from './shared/components/redirect-confirmacion/redirect-confirmacion.component';
import { IniciarSesionComponent } from './components/iniciar-sesion/iniciar-sesion.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatExpansionModule} from '@angular/material/expansion';
import { RedirectOpinionComponent } from './shared/components/redirect-opinion/redirect-opinion.component';
import { PacienteService } from './services/paciente.service';
import { MatMenuModule } from '@angular/material/menu';
import { SharedModule } from './shared/shared.module';



@NgModule({
  declarations: [
    AppComponent,
    IniciarComponent,
    RedirectPageComponent,
    RedirectConfirmacionComponent,
    RedirectOpinionComponent,
    IniciarSesionComponent


    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    ToastModule.forRoot(),
    MatDialogModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatButtonToggleModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatStepperModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatMenuModule,
    SharedModule
    
    

  ],

  providers: [
    CitaService,
    ComboService,
    TokenService,
    UsuarioService,
    PacienteService
  ],

  entryComponents: [
    IniciarComponent,
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
