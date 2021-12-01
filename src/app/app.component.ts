import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { Router, Event, NavigationStart, NavigationExtras, ActivatedRoute } from '@angular/router';
import { MatDialog, MatMenuTrigger } from '@angular/material';
import { saveAuthCode, removeSession, getAuthCode, saveAuthAccess } from './core/auth/storage/token.storage';
import { Configuration } from './core/configuration/app.constants';
import { saveIdUsuario, getIdUsuario, getSessionId } from './core/auth/storage/cabecera.storage';
import { Observable } from 'rxjs/Observable';
import { CitaService } from './services/cita.service';
import { getNombreUsuario } from './core/auth/storage/usuario.storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  someMethod() {
    this.trigger.openMenu();
  }
  imagesUrl: string[];



  constructor(
    public toastr: ToastsManager,
    public vRef: ViewContainerRef,
    public _router: Router,
    public dialog: MatDialog,
    public _configuration: Configuration,
    public _citaService: CitaService,
    public _activatedRoute: ActivatedRoute) {
    this.toastr.setRootViewContainerRef(vRef);

    this._router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        let menuHiddenList = [
          "/redirect-page",
          "/redirect-confirmacion",
          "/redirect-opinion"
        ];

        if (this.contieneValorEnLista(menuHiddenList, event.url)) {
          this.isIndexPage$ = false;
        } else {
          setTimeout(() => {
            this.isIndexPage$ = true;
          });
        }

        if (!getIdUsuario() && !getAuthCode() && !getNombreUsuario()) {
          this.isLogged$ = false;
        } else {
          this.isLogged$ = true;
          this.nombreUsuario = getNombreUsuario()
        }
      }

    })

    // Si se quiere implementar el auth0-js guiarse de -> https://jolugama.com/blog/2018/12/15/autenticacion-auth0/

    let route = window.location.href.replace(this._configuration.hostName + '?', '');

    if (route.includes('tokenOpinion')) {
      let param = route.split('?')[1].split('=')[1]

      console.log("QUE REDIRECCIONE", route);
      this._router.navigate(['redirect-opinion'], { queryParams: { tokenOpinion: param } })
    } else {
      console.log("NO DEBE REDIRECCIONAR");
      if (!getIdUsuario() && !getAuthCode()) {
        this.isLogged$ = false;
        this.checkAuth0().then((state: string) => {
          console.log("Viene del Loggearse correctamente", state);
          this.isLogged$ = true;

          if (state.split("---")[1]) {
            console.log("ACTUALIZAR EL CODUSUARIO");
            this.insertarActualizarCitaTemporal();
          }
          this._router.navigate([state.split("---")[0]]);


        }).catch((e) => {
          console.log("No se loggeo correctamente", e);
          this.isLogged$ = false;
          removeSession();
          this._router.navigate(['index']);
        }).catch(e => console.error(e));
      } else {
        this.isLogged$ = true;
        this._router.navigate(['index']);
      }
    }
  }
  ngOnInit(): void {
  }

  public isLogged$ = false;
  public isIndexPage$ = false;

  public nombreUsuario = null;

  public login() {
    if (!this.isLogged$) {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          previous: this._router.url.split("?")[0].replace("aviso-sesion", "confirmar-reserva---" + getSessionId())
        }
      }
      this._router.navigate(['/iniciar-sesion'], navigationExtras)
    }
  }

  public checkAuth0() {
    let promise = new Promise((resolve, reject) => {
      let route = window.location.href.replace(this._configuration.hostName + '#', '');

      if (route.includes('code') && route.includes('access_token') && route.includes('state')) { //&& route.includes('nonce')
        let param = {
          state: null,
          code: null,
          access_token: null
        }
        route.split('&').forEach((p) => {
          let partes = p.split('=');
          param[partes[0]] = partes[1];
        });


        try {

          if (this.validarExistenciaUsuario()) {
            console.log(param.access_token);
            let idUsuario = JSON.parse(atob(param.access_token.split('.')[1]))["sub"];
            saveAuthCode(param.code);
            saveIdUsuario(idUsuario);

            if (route.includes('type')) {
              saveAuthAccess(param.access_token)
            }
          }

          param.state = param.state.replace(/(%2F)/g, "/");
          resolve(param.state);
        } catch (error) {
          reject(error);
        }

      } else {
        reject("No retorna la Autorizacion.");
      }
    });
    return promise;
  }

  public logout() {
    window.location.href = this._configuration.getLogoutAuth0();
    removeSession();
  }

  public insertarActualizarCitaTemporal() {
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

  public validarExistenciaUsuario() {
    console.log("AQUI DEBE DE IR LA VALIDACION SI EL USUARIO NO EXISTE, LANZAR UN MODAL CON EL REGISTRO DE USUARIO.");

    return true
  }

  public irCuenta() {
    this._router.navigate(['index/crear-cuenta']);
  }

  public verPerfil() {
    this._router.navigate(['index/mi-cuenta/perfil']);
  }

  public verCitas() {
    this._router.navigate(['index/mi-cuenta/citas']);
  }

  public irInicio() {
    this._router.navigate(['index']);
  }

  public contieneValorEnLista(lista: string[], valor: string): boolean {
    let i = 0;
    while (i < lista.length) {
      if (valor.includes(lista[i])) {
        return true
      }
      i++
    }
    return false
  }


}
