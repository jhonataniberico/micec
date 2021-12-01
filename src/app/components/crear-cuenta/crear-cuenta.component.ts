import { Observable } from 'rxjs/Observable';
import { CitaService } from './../../services/cita.service';
import { Component, OnInit } from '@angular/core';
import { isInvalid, setInputPattern, setValidatorPattern, setQuantifier } from '../../shared/helpers/custom-validators/validators-messages/validators-messages.component';
import { getSessionId, saveIdUsuario, getIdUsuario } from '../../core/auth/storage/cabecera.storage';
import { SecurityService } from '../../services/security.service';
import { Router, ActivatedRoute } from '@angular/router';
import { saveAuthCode, saveAuthNonce, getAuthCode } from '../../core/auth/storage/token.storage';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-crear-cuenta',
  templateUrl: './crear-cuenta.component.html',
  styleUrls: ['./crear-cuenta.component.scss']
})
export class CrearCuentaComponent implements OnInit {

  public hide: boolean = true;

  public request = {
    nombres: null,
    apellidoPaterno: null,
    apellidoMaterno: null,
    email: null,
    telefonoMovil: null,
    pagina: null,
    password: null,
    sessionId: null
  };

  public flag1 = false;
  public flag2 = false;
  public flag3 = false;

  public previous: string = null;

  // resolved(captchaResponse: string) {
  //   console.log(`Resolved captcha with response: ${captchaResponse}`);
  // }

  constructor(
    public _toaster: ToastsManager,
    public _route: ActivatedRoute,
    public _router: Router,
    public _citaService: CitaService,
    public _securityService: SecurityService) {
    this._route.queryParams.subscribe(params => {
      if (params.previous) {
        this.previous = params.previous;
      }
    }).unsubscribe();
  }

  ngOnInit() {
  }

  public checkPassword() {
    let contMa = 0;
    let contMi = 0;
    let contNu = 0;

    for (let i = 0; i < (this.request.password).length; i++) {
      let evaluado = (this.request.password).charAt(i);

      if (isNaN(evaluado)) {
        if (evaluado == (evaluado).toUpperCase()) {
          contMa++;
        }

        if (evaluado == (evaluado).toLowerCase()) {
          contMi++;
        }
      } else {
        contNu++;
      }
    }

    if (contMa > 0) {
      this.flag1 = true;
    } else {
      this.flag1 = false;
    }

    if (contMi > 0) {
      this.flag2 = true;
    } else {
      this.flag2 = false;
    }

    if (contNu > 0) {
      this.flag3 = true;
    } else {
      this.flag3 = false;
    }

  }

  public postInsertarPaciente() {
    this.request.pagina = '/index/confirmar-reserva';
    this.request.sessionId = getSessionId();

    this._securityService.registrarPacienteUsuario(this.request)
      .subscribe(
        data => {
          if (data.estado == 1) {
            saveAuthCode(data.token.code);
            saveAuthNonce(data.token.nonce);
            saveIdUsuario(data.token.idUsuario);

            if (getSessionId() != null) {
              let _params = {
                citaTemporal: {
                  sessionID: getSessionId(),
                  usuario: getIdUsuario(),
                  tokenUrl: data.token.code,
                  pagina: data.pagina
                }
              };
              this.insertarActualizarCitaTemporal(_params);
            } else {
              this._router.navigate(['index/reserva-telecita-medica']);
            }

            this._toaster.success("Exitoso", data.mensaje);
          } else {
            this._toaster.warning("Advertencia", data.mensaje);
          }
        },
        error => {
          console.error(error)
        }
      );

  }

  public insertarActualizarCitaTemporal(_params) {
    this._citaService.insertarActualizarCitaTemporal(_params)
      .subscribe(data => {
        if (data.estado == 1) {
          this._router.navigate([this.previous.split("---")[0]])
        }
        return true;
      },
        error => {
          return Observable.throw(error);
        }
      );
  }




  //Validadores

  public isInvalid(_ngForm: any): boolean {
    return isInvalid(_ngForm);
  }
  public setInputPattern(_event: any, _pattern: any): void {
    setInputPattern(_event, _pattern);
  }
  public setValidatorPattern(_pattern: string, _quantifier: any, _exactStart?: boolean, _exactEnd?: boolean, _regexFlags?: string): RegExp {
    return setValidatorPattern(_pattern, _quantifier, _exactStart, _exactEnd, _regexFlags);
  }
  public setQuantifier(_quantifier1?: null | number | string, _quantifier2?: null | number): {} {
    return setQuantifier(_quantifier1, _quantifier2);
  }

}
