import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ToastsManager } from 'ng2-toastr';
import { getIdUsuario, getSessionId, saveIdUsuario } from '../../core/auth/storage/cabecera.storage';
import { saveAuthCode, saveAuthNonce } from '../../core/auth/storage/token.storage';
import { removeUsuario, saveUsuario, getUsuario, saveNombreUsuario } from '../../core/auth/storage/usuario.storage';
import { Configuration } from '../../core/configuration/app.constants';
import { CitaService } from '../../services/cita.service';
import { PacienteService } from '../../services/paciente.service';
import { UsuarioService } from '../../services/usuario.service';
import { isInvalid, setInputPattern, setQuantifier, setValidatorPattern } from '../../shared/helpers/custom-validators/validators-messages/validators-messages.component';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.scss']
})
export class IniciarSesionComponent implements OnInit {

  constructor(
    public _toaster: ToastsManager,
    private _usuarioService: UsuarioService,
    private _configuration: Configuration,
    private _route: ActivatedRoute,
    private _pacienteService: PacienteService,
    private router: Router,
    public _citaService: CitaService) {
    this._route.queryParams.subscribe(params => {
      if (params.previous) {
        this.previous = params.previous;
      }
    }).unsubscribe();
  }

  public request = {
    username: null,
    password: null,
    nonce: null
  }

  public flgRecordar = false;

  public previous: string = null;

  public flagSpinner: boolean = false;

  ngOnInit() {
    if (getUsuario()) {
      this.request.username = getUsuario().username;
      this.request.password = getUsuario().password;
      this.flgRecordar = true;
    }
  }

  public login() {
    this.flagSpinner = true
    this.request.nonce = this._configuration.randomString(32);

    this._usuarioService.loginUser(this.request)
      .subscribe(
        data => {
          if (data.estado == 1) {
            saveIdUsuario(data.idUsuario)
            saveAuthCode(data.code)
            saveAuthNonce(this.request.nonce)

            this._pacienteService.obtenerPacienteUsuario(data.idUsuario)
              .subscribe(
                data => {
                  this.flagSpinner = false;
                  if (data.estado == 1) {
                    saveNombreUsuario(data.paciente.nombre + " " + data.paciente.apPaterno);

                    if (this.flgRecordar) {
                      saveUsuario({ username: this.request.username, password: this.request.password })
                    } else {
                      removeUsuario()
                    }
                    this.previous = this.previous.replace('%2F', '/')

                    if (this.previous.split("---")[1]) {
                      this.insertarActualizarCitaTemporal();
                    }
                    this.router.navigate([this.previous.split("---")[0]])

                    this._toaster.success("Exitoso", data.mensaje);
                  } else {
                    this._toaster.warning("Advertencia", data.mensaje);
                  }
                }, error => {
                  this.flagSpinner = false;
                  return Observable.throw(error);
                })
          } else {
            this.flagSpinner = false;
            this._toaster.warning("Advertencia", data.mensaje);
          }
        },
        error => {
          this.flagSpinner = false;
          return Observable.throw(error);
        }
      );
    // this.flagSpinner = true; //AQUI YA NO
  }

  public loginFB() {
    this._route.queryParams.subscribe(params => {
      if (params.previous) {
        window.location.href = this._configuration.getLoginAuth0FB(params.previous)
      }
    }).unsubscribe();
  }

  public loginGoogle() {
    this._route.queryParams.subscribe(params => {
      if (params.previous) {
        window.location.href = this._configuration.getLoginAuth0Google(params.previous)
      } // EN LAS REDES SOCIALES YA NO, PORQUE REDIRECCIONAN A OTRAS PAGINAS, ES LO UNICO QUE HACE
    }).unsubscribe();
  }

  insertarActualizarCitaTemporal() {
    let _params = {
      citaTemporal: {
        sessionID: getSessionId(),
        usuario: getIdUsuario()
      }
    }

    this._citaService.insertarActualizarCitaTemporal(_params)
      .subscribe(data => {
        if (data.estado == 1) {
        }
      },
        error => {
          return Observable.throw(error);
        }
      );
  }

  //PARA VALIDACIONES
  public isInvalid(_controlVar: any): boolean {
    return isInvalid(_controlVar);
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
