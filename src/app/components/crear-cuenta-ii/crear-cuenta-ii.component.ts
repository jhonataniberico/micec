import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SecurityService } from '../../services/security.service';
import { saveAuthCode, saveAuthNonce } from '../../core/auth/storage/token.storage';
import { saveIdUsuario } from '../../core/auth/storage/cabecera.storage';

@Component({
  selector: 'app-crear-cuenta-ii',
  templateUrl: './crear-cuenta-ii.component.html',
  styleUrls: ['./crear-cuenta-ii.component.scss']
})
export class CrearCuentaIiComponent implements OnInit {

  constructor(
    private _router: Router,
    private securityService: SecurityService) { }

  codigoVerificacion: string;
  request = {
    codigoVerificacion: null
  }

  ngOnInit() {
  }

  public siguiente() {

    if (this.codigoVerificacion && this.codigoVerificacion.trim() !== '') {
      this.request = {
        codigoVerificacion: this.codigoVerificacion.trim()
      }
      this.securityService.verificarActivarCuenta(this.request)
        .subscribe(
          data => {
            if (data.estado === 0) {
              alert(data.mensaje);
            } else {
              saveAuthCode(data.token.code);
              saveAuthNonce(data.token.nonce);
              saveIdUsuario(data.token.idUsuario);
              this._router.navigate([data.pagina]);
            }
          },
          error => {
            alert("Ocurrio un error");
            console.error(error);
          }
        );
    } else {
      alert("Codigo vacio");
    }

  }

  public regresar() {
    this._router.navigate(['index/crear-cuenta'])
  }



}
