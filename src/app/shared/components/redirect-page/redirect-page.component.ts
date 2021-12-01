import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from '../../../services/token.service';
import { UsuarioService } from '../../../services/usuario.service';
import { saveAuthCode, saveAuthNonce } from '../../../core/auth/storage/token.storage';
import { saveIdUsuario } from '../../../core/auth/storage/cabecera.storage';

@Component({
  selector: 'app-redirect-page',
  templateUrl: './redirect-page.component.html',
  styleUrls: ['./redirect-page.component.scss']
})
export class RedirectPageComponent implements OnInit {

  constructor(private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _tokenService: TokenService,
    private _usuarioService: UsuarioService) {
    this._activatedRoute.queryParams.subscribe(params => {
      this.request.idUsuario = params["ident"];
      this.request.tokenUrl = params["tokenUrl"];
    });
  }

  public request = {
    idUsuario: null,
    tokenUrl: null
  }

  ngOnInit() {
    this.validar();
  }

  private validar() {
    if (this.request.idUsuario && this.request.tokenUrl) {
      this._tokenService.validateTokenUrl(this.request)
        .subscribe(dataTokenService => {
          if (dataTokenService.estado == 1) {
            this._usuarioService.activarPacienteUsuario(this.request)
              .subscribe(data => {
                if (data.estado == 1) {
                  this._tokenService.obtenerDatosToken(this.request)
                    .subscribe(data => {
                      if (data.estado == 1) {
                        saveAuthCode(data.token.code);
                        saveAuthNonce(data.token.nonce);
                        saveIdUsuario(data.token.idUsuario);
                        this._router.navigate([dataTokenService.mensaje]);
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
    } else {
      setTimeout(() => {
        this._router.navigate(['index'])
      });
    }
  }

}
