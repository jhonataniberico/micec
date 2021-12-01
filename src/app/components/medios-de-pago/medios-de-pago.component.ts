import { ModalConfirmacionComponent } from './../../shared/components/modal-confirmacion/modal-confirmacion.component';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { MailService } from './../../services/mail.service';
import { CitaService } from './../../services/cita.service';
import { Component, OnInit, Input } from '@angular/core';
import { ModalHorarioComponent } from '../../shared/components/modal-horario/modal-horario.component';
import { ToastsManager } from 'ng2-toastr';


@Component({
  selector: 'app-medios-de-pago',
  templateUrl: './medios-de-pago.component.html',
  styleUrls: ['./medios-de-pago.component.scss']
})
export class MediosDePagoComponent implements OnInit {

  @Input() params;

  public cita: any = {
    servicio: {},
    paciente: {},
    profesional: {
      especialidad: {}
    }
  };

  request = {
    nombres: null,
  };

  public flagSpinner = false;

  constructor(
    public _toaster: ToastsManager,
    public _modalDialog: MatDialog,
    public route: ActivatedRoute,
    public _router: Router,
    public citaService: CitaService,
    public mailService: MailService) {

    this.route.queryParams.subscribe(params => {
      if (params.data) {
        this.params = JSON.parse(params.data);
      }
    }).unsubscribe();
  }

  ngOnInit() {
    this.obtenerPagoCita(1);
  }

  public obtenerPagoCita(idTipo) {
    this.flagSpinner = true;
    let param = {
      idCita: this.params.idCita
    }

    this.citaService.obtenerPagoCita(param)
      .subscribe(data => {
        this.flagSpinner = false;
        if (data.estado == 1) {
          this.cita = data.cita;

          if (this.cita.idCita) {
            this.emailConfirmarCita(idTipo);
          }
        } else {
          this.cita = null;
        }
      },
        error => {
          console.error(error);
        });
  }

  public emailConfirmarCita(idTipo) {
    let param = {
      tipo: idTipo,
      correo: {
        destinatario: this.cita.paciente.email
      },
      cita: {
        servicio: this.cita.servicio,
        precioCita: this.cita.precioCita,
        diaHora: this.cita.diaHora,
        duracionCita: this.cita.duracionCita,
        idCita: this.cita.idCita
      },
      profesional: this.cita.profesional,
      medioPagoList: this.cita.profesional.medioPagoList
    }

    this.mailService.emailConfirmarCita(param)
      .subscribe(data => {
        if (data.estado == 1) {
        }
      },
        error => {
          console.error(error);
        }
      );
  }

  public cancelar() {
    const dialogRef = this._modalDialog.open(ModalConfirmacionComponent, {
      autoFocus: false,
      // maxWidth: '40%',
      width: '25%',
      // maxHeight: '80%',
      height: '20%',
      disableClose: true,
      hasBackdrop: true,
    });
    dialogRef.componentInstance.mensajeConfirmacion = "¿Está seguro que desea cancelar la cita?";
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.cancelarCita();
      }
    });
  }

  modificarCita() {
    //tipo 1 fijo para modificar la cita

    let data = {
      idProfesional: this.cita.profesional.idProfesional,
      idEspecialidad: this.cita.profesional.especialidad.idEspecialidad,
      tipoServicio: this.cita.servicio.tipoServicio,
      ordenColegiatura: "ASC"
    };

    let dataCita = {
      idCita: this.cita.idCita,
      tipo: 1
    };

    const dialogRef = this._modalDialog.open(ModalHorarioComponent, {
      autoFocus: false,
      // maxWidth: '40%',
      width: '28%',
      // maxHeight: '80%',
      height: '72%',
      disableClose: false,
      hasBackdrop: true,
    });
    dialogRef.componentInstance.data = data;
    dialogRef.componentInstance.dataCita = dataCita;
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.obtenerPagoCita(2);
        this._router.navigate(['index/mi-cuenta/citas']);
      }
    });
  }

  cancelarCita() {
    //tipo 2 fijo para cancelar la cita

    let request = {
      cita: {
        idCita: this.cita.idCita
      },
      tipo: 2
    };

    this.citaService.insertarActualizarCancelarCita(request)
      .subscribe(data => {
        if (data.estado == 1) {
          this._toaster.success("Exitoso", data.mensaje);
          this._router.navigate(['index/mi-cuenta/citas']);
        } else {
          this._toaster.warning("Advertencia", data.mensaje);
        }
      },
        error => {
          console.error(error);
        }
      );
  }

}
