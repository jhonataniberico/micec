import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../../services/token.service';
import { saveAuthCode, saveAuthNonce } from '../../../core/auth/storage/token.storage';
import { saveIdUsuario } from '../../../core/auth/storage/cabecera.storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-redirect-confirmacion',
  templateUrl: './redirect-confirmacion.component.html',
  styleUrls: ['./redirect-confirmacion.component.scss']
})
export class RedirectConfirmacionComponent implements OnInit {

  constructor(private _router: Router,
    private _tokenService: TokenService) { }

  public request = {
    email: "sisur2020tp@gmail.com"
  };

  ngOnInit() {
    this.autoLogin();
  }

  public autoLogin() {
    this._tokenService.obtenerDatosToken(this.request)
      .subscribe(data => {
        if (data.estado == 1) {
          saveAuthCode(data.token.code);
          saveAuthNonce(data.token.nonce);
          saveIdUsuario(data.token.idUsuario);
          setTimeout(() => {
            this._router.navigate(['index'])
          });
        } else {
          setTimeout(() => {
            this._router.navigate(['index'])
          });
        }
      },
        error => {
          console.error(error);
          setTimeout(() => {
            this._router.navigate(['index'])
          });
        });
  }

}
