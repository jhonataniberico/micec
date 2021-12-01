import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComboService } from '../../services/combo.service';
import { SecurityService } from '../../services/security.service';
import { getSessionId } from '../../core/auth/storage/cabecera.storage';

@Component({
  selector: 'app-crear-cuenta-i',
  templateUrl: './crear-cuenta-i.component.html',
  styleUrls: ['./crear-cuenta-i.component.scss']
})
export class CrearCuentaIComponent implements OnInit {

  constructor(
    private __router: Router,
    private comboService: ComboService,
    private securityService: SecurityService
  ) { }

  request = {
    nombres: null,
    apellidoPaterno: null,
    apellidoMaterno: null,
    idTipoDocumento: null,
    numeroDocumento: null,
    email: null,
    pais: null,
    pagina: null,
    password: null,
    password2: null,
    sessionId: null
  };

  combos = {
    tiposDocumento: []
  };

  notChecked = true;

  ngOnInit() {
    this.populateCombos();
  }

  public populateCombos() {
    this.comboService.obtenerTipoDocumento()
      .subscribe(
        data => {
          if (data.estado === 1) {
            this.combos.tiposDocumento = data.tipoDocumentoList;
          }
        },
        error => console.error(error)
      );
  }

  public siguiente() {
    this.request.pagina = '/index/confirmar-reserva';
    this.request.sessionId = getSessionId();

    this.securityService.registrarPacienteUsuario(this.request)
      .subscribe(
        data => {
          if (data.estado === 1) {
            this.crearCuentaII();
          } else {
            alert(data.mensaje);
          }
        },
        error => console.error(error)
      );

  }

  public crearCuentaII() {
    this.__router.navigate(['index/crear-cuentaII']);
  }

  public regresar() {
    this.__router.navigate(['index/aviso-sesion'])
  }

  public onChangeChk(isChecked: boolean) {
    this.notChecked = !isChecked;
  }
}
