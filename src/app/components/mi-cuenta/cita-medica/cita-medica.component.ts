import { MailService } from './../../../services/mail.service';
import { ModalConfirmacionComponent } from './../../../shared/components/modal-confirmacion/modal-confirmacion.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ToastsManager } from 'ng2-toastr';
import { CitaService } from '../../../services/cita.service';
import { ModalHorarioComponent } from '../../../shared/components/modal-horario/modal-horario.component';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-cita-medica',
  templateUrl: './cita-medica.component.html',
  styleUrls: ['./cita-medica.component.scss']
})
export class CitaMedicaComponent implements OnInit {

  public cita: any = {
    servicio: {},
    paciente: {},
    profesional: {
      especialidad: {}
    }
  };

  constructor(
    public _toaster: ToastsManager,
    public _modalDialog: MatDialog,
    public _router: Router,
    public citaService: CitaService,
    public mailService: MailService) { }

  public citasHistoricas: any = null;

  ngOnInit() {
    this.listarCitasHistoricasPorUsuario()
  }

  public descripcionEstadoCita(estadoCita: string) {
    switch (estadoCita) {
      case 'P': return 'CITA POR COMPLETAR';
      case 'C': return 'CITA CANCELADA';
      case 'A': return 'CITA COMPLETADA';
    }
  }

  public listarCitasHistoricasPorUsuario() {
    this.citaService.listarCitasHistoricasPorUsuario()
      .subscribe(data => {
        this.citasHistoricas = data.citasHistoricas;
      },
        error => console.error(error)
      );
  }

  public obtenerPagoCita(cita) {
    let param = {
      idCita: cita.idCita
    }

    this.citaService.obtenerPagoCita(param)
      .subscribe(data => {
        if (data.estado == 1) {
          this.cita = data.cita;

          if (this.cita.idCita) {
            this.emailConfirmarCita();
          }
        } else {
          this.cita = null;
        }
      },
        error => {
          console.error(error);
        }
      );
  }

  public emailConfirmarCita() {
    let param = {
      tipo: 2,
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
        } else {
        }
      },
        error => {
          console.error(error);
        }
      );
  }

  public cancelar(id) {
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
        this.cancelarCita(id);
      }
    });
  }

  modificarCita(cita) {
    //tipo 1 fijo para modificar la cita

    let data = {
      idProfesional: cita.profesional.idProfesional,
      idEspecialidad: cita.profesional.especialidad.idEspecialidad,
      tipoServicio: cita.servicio.tipoServicio,
      ordenColegiatura: "ASC"
    };

    let dataCita = {
      idCita: cita.idCita,
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
        this.obtenerPagoCita(cita);
        this.listarCitasHistoricasPorUsuario();
      }
    });
  }

  cancelarCita(id) {
    //tipo 2 fijo para cancelar la cita

    let request = {
      cita: {
        idCita: id
      },
      tipo: 2
    };

    this.citaService.insertarActualizarCancelarCita(request)
      .subscribe(data => {
        if (data.estado == 1) {
          this.listarCitasHistoricasPorUsuario();
          this._toaster.success("Exitoso", data.mensaje);
        } else {
          this._toaster.warning("Advertencia", data.mensaje);
        }
      },
        error => {
          console.error(error);
        }
      );
  }

  public darOpinion(cita) {
    cita.profesional['servicio'] = cita.servicio;

    let params = {
      profesional: cita.profesional,
      idCita: cita.idCita
    }

    let navigationExtras: NavigationExtras = {
      queryParams: {
        data: JSON.stringify(params)
      }
    }

    this._router.navigate(['index/opinion-paciente'], navigationExtras);

  }

}
