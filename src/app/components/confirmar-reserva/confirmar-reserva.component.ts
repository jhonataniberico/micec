import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { CitaService } from '../../services/cita.service';
import { getSessionId } from '../../core/auth/storage/cabecera.storage';
import { ToastsManager } from 'ng2-toastr';


@Component({
  selector: 'app-confirmar-reserva',
  templateUrl: './confirmar-reserva.component.html',
  styleUrls: ['./confirmar-reserva.component.scss']
})

export class ConfirmarReservaComponent implements OnInit {

  public datosReserva = {
    horaYFecha: null,
    profesional: null,
    especialidad: null,
    direccionCentro: null,
    nombre: null,
    nroDocumento: null,
    email: null,
    revision: null,
    precioConsulta: null
  };

  public confirmarReservaRequest = {
    cita: null,
    tipo: null
  };

  public flagSpinner = false;

  constructor(
    public _toaster: ToastsManager,
    private _router: Router,
    private _citaService: CitaService,
  ) { }

  ngOnInit() {
    this.flagSpinner = true
    let currentSessionId = getSessionId();
    this._citaService.obtenerCitaTemporal(currentSessionId)
      .subscribe(
        data => {
          this.flagSpinner = false
          let dataCita = data.citaTemporal.cita;

          this.datosReserva.horaYFecha = dataCita.hora + " " + dataCita.fecha;
          this.datosReserva.profesional = dataCita.profesional.nombre + " " + dataCita.profesional.apPaterno + " " + dataCita.profesional.apMaterno;
          this.datosReserva.especialidad = dataCita.profesional.especialidades;
          this.datosReserva.nombre = dataCita.paciente.nombres + " " + dataCita.paciente.apellidoPaterno + " " + dataCita.paciente.apellidoMaterno;
          this.datosReserva.nroDocumento = dataCita.paciente.numeroDocumento;
          this.datosReserva.email = dataCita.paciente.email;
          this.datosReserva.precioConsulta = dataCita.servicio.tarifa;
          this.confirmarReservaRequest.cita = dataCita;
        },
        error => console.error(error)
      );
  }

  regresar() {
    this._router.navigate(['index/reserva-telecita-medica']);

  }

  confirmarReserva() {
    this._citaService.insertarActualizarCancelarCita(this.confirmarReservaRequest)
      .subscribe(
        data => {
          if (data.estado == 1) {
            let params = {
              idCita: data.id
            };

            let navigationExtras: NavigationExtras = {
              queryParams: {
                data: JSON.stringify(params)
              }
            };

            this._toaster.success("Exitoso", data.mensaje);
            this._router.navigate(['index/medios-pago'], navigationExtras);
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
