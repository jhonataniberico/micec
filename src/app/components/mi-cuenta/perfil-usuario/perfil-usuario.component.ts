import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ToastsManager } from 'ng2-toastr';
import { getIdUsuario } from '../../../core/auth/storage/cabecera.storage';
import { removeSession } from '../../../core/auth/storage/token.storage';
import { Configuration } from '../../../core/configuration/app.constants';
import { ComboService } from '../../../services/combo.service';
import { PacienteService } from '../../../services/paciente.service';
import { SecurityService } from '../../../services/security.service';
import { ModalConfirmacionComponent } from './modal-confirmacion/modal-confirmacion.component';
import { ModalPasswordComponent } from './modal-password/modal-password.component';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.scss']
})
export class PerfilUsuarioComponent implements OnInit {

  constructor(private _comboService: ComboService,
    private _toaster: ToastsManager,
    public _modalDialog: MatDialog,
    private _pacienteService: PacienteService,
    private _securityService: SecurityService,
    private _configuration: Configuration) { }

  public listaTipoDoc = []

  public request = {
    idPaciente: null,
    nombres: null,
    apellidoPaterno: null,
    apellidoMaterno: null,
    idTipoDocumento: null,
    numeroDocumento: null,
    email: null,
    newEmail: null,
    password: null,
    newPassword: null
  }

  public editEmail = false;

  ngOnInit() {
    this.obtenerTipoDocumento().then(() => {
      this.obtenerDatosPaciente()
    })
  }

  public showEmail() {
    if (!this.editEmail) {
      this.request.newPassword = null
      this.editEmail = true
    } else {
      this.editEmail = false
    }
  }

  private obtenerTipoDocumento() {
    let promise = new Promise((res, rej) => {
      this._comboService.obtenerTipoDocumento()
        .subscribe(data => {
          if (data.estado == 1) {
            this.listaTipoDoc = data.tipoDocumentoList
          } else {
            this.listaTipoDoc = []
          }
          res()
        },
          error => {
            console.error(error);
            rej()
          }
        );
    })
    return promise
  }

  private obtenerDatosPaciente() {
    this.request = {
      idPaciente: null,
      nombres: null,
      apellidoPaterno: null,
      apellidoMaterno: null,
      idTipoDocumento: null,
      numeroDocumento: null,
      email: null,
      newEmail: null,
      password: null,
      newPassword: null
    }

    this.editEmail = false

    this._pacienteService.obtenerPacienteUsuario(getIdUsuario())
      .subscribe(data => {
        if (data.estado == 1) {
          this.request.idPaciente = data.paciente.idPaciente
          this.request.apellidoMaterno = data.paciente.apMaterno
          this.request.apellidoPaterno = data.paciente.apPaterno
          this.request.email = data.paciente.email
          this.request.idTipoDocumento = data.paciente.idTipoDocumento
          this.request.nombres = data.paciente.nombre
          this.request.numeroDocumento = data.paciente.numeroDocumento
        } else {
          this._toaster.warning("Advertencia", data.mensaje);
        }
      },
        error => {
          console.error(error);
        }
      );
  }

  public actualizarPaciente() {
    this._securityService.actualizarPaciente(this.request)
      .subscribe(data => {
        if (data.estado == 1) {
          this._toaster.success("Exitoso", data.mensaje)
          this.obtenerDatosPaciente()
        } else {
          this._toaster.warning("Advertencia", data.mensaje);
        }
      },
        error => {
          console.error(error);
        }
      );
  }

  public changePassword() {
    let data = {
      password: this.request.password,
      newPassword: this.request.newPassword
    }
    const dialogRef = this._modalDialog.open(ModalPasswordComponent, {
      autoFocus: false,
      // maxWidth: '40%',
      width: '50%',
      // maxHeight: '80%',
      // height: '67%',
      disableClose: false,
      hasBackdrop: true,
    });
    dialogRef.componentInstance.data = data;
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.request.password = result.password
        this.request.newPassword = result.newPassword
      }
    });
  }

  public eliminarCuenta() {
    const dialogRef = this._modalDialog.open(ModalConfirmacionComponent, {
      autoFocus: false,
      // maxWidth: '40%',
      width: '30%',
      // maxHeight: '80%',
      // height: '67%',
      disableClose: false,
      hasBackdrop: true,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._securityService.eliminarPacienteUsuario()
          .subscribe(data => {
            if (data.estado == 1) {
              this._toaster.success("Exitoso", data.mensaje)
              window.location.href = this._configuration.getLogoutAuth0();
              removeSession();
            } else {
              this._toaster.warning("Advertencia", data.mensaje);
            }
          },
            error => {
              console.error(error);
            }
          );
      }
    });
  }

}
