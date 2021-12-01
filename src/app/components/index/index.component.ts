import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { isInvalid, setInputPattern, setValidatorPattern, setQuantifier } from '../../shared/helpers/custom-validators/validators-messages/validators-messages.component';
import { Router, NavigationExtras, ActivatedRoute, NavigationStart, } from '@angular/router';
import { EspecialidadService } from '../../services/especialidad.service';
import { ProfesionalService } from '../../services/profesional.service';
import { Configuration } from '../../core/configuration/app.constants';
import { getIdUsuario, removeSessionId } from '../../core/auth/storage/cabecera.storage';
import { getAuthCode } from '../../core/auth/storage/token.storage';
import { removeParamsBusqueda, saveBusqueda } from '../../core/auth/storage/busqueda.storage';
import { Location } from '@angular/common';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  constructor(
    public _router: Router,
    public _configuration: Configuration,
    private _especialidadService: EspecialidadService,
    private _profesionalService: ProfesionalService,
    private _activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    public location: Location) {
    if (getIdUsuario() && getAuthCode()) {
      this.isLogged$ = true;
    } else {
      this.isLogged$ = false;
    }

    if (getIdUsuario() && getAuthCode()) {
      this.isLogged$ = true;
    } else {
      this.isLogged$ = false;
    }

    this._activatedRoute.queryParams.subscribe(params => {
      if (params.validate == false || params.validate == 'false') {
        this.openDialog()
      }
    }).unsubscribe();

  }


  public isLogged$ = false;

  public busquedaPor = null;

  public request = {
    especialidad: {
      idEspecialidad: null,
      descripcion: null,
    },
    profesional: {
      idProfesional: null,
      medico: null
    }
  }

  public especialidadList = [];
  public profesionalList = [];

  public filtro = {
    especialidad: [],
    profesional: []
  }

  public Especialidad;


  ngOnInit() {
    removeSessionId();
    this.busquedaPor = 'especialidad';
    this.listarEspecialidad();
    this.listarProfesional();
  }


  openDialog() {


    this.dialog.open(DialogDataExampleDialog, {

      width: '55%',
      maxWidth: '70%',
      height: '342px'
    });
  }


  listarEspecialidad() {
    this._especialidadService.listarEspecByGrupOcup(1)
      .subscribe(data => {
        if (data.estado == 1) {
          this.especialidadList = data.especialidadList;
          this.filtro.especialidad = data.especialidadList;
        } else {
          this.especialidadList = [];
          this.filtro.especialidad = []
        }
      },
        error => {
          console.error(error);
        });
  }

  filtrarEspecialidad(descripcion) {
    this.request.especialidad.idEspecialidad = null;
    this.filtro.especialidad = this.especialidadList.filter(especialidad =>
      especialidad.descripcion.toLowerCase().indexOf(descripcion.toLowerCase()) === 0);
  }


  selectEspecialidad(e) {
    this.request.especialidad.idEspecialidad = e.idEspecialidad;
    this.request.especialidad.descripcion = e.descripcion;
  }

  listarProfesional() {
    this._profesionalService.listarProfesionales()
      .subscribe(data => {
        if (data.estado == 1) {
          this.profesionalList = data.profesionalList;
          this.filtro.profesional = data.profesionalList;
        } else {
          this.profesionalList = [];
          this.filtro.profesional = []
        }
      },
        error => {
          console.error(error);
        });
  }

  filtrarProfesional(medico) {
    this.request.profesional.idProfesional = null;
    this.filtro.profesional = this.profesionalList.filter(profesional =>
      profesional.nombre.toLowerCase().indexOf(medico.toLowerCase()) === 0 ||
      profesional.apPaterno.toLowerCase().indexOf(medico.toLowerCase()) === 0 ||
      profesional.apMaterno.toLowerCase().indexOf(medico.toLowerCase()) === 0 ||
      (profesional.nombre + ' ' + profesional.apPaterno).toLowerCase().indexOf(medico.toLowerCase()) === 0 ||
      (profesional.apPaterno + ' ' + profesional.apMaterno).toLowerCase().indexOf(medico.toLowerCase()) === 0 ||
      (profesional.nombre + ' ' + profesional.apPaterno + ' ' + profesional.apMaterno).toLowerCase().indexOf(medico.toLowerCase()) === 0);
  }

  /* ----------especialidades especificas de cada medico----------- */
  filtrarEspecialidadMed(idProfesional) { // AL QUERER SETEAR DESPUES DE OBTENER LA LISTA; ES MEJOR USAR PROMESAS
    let promise = new Promise((resolve, reject) => {
      this._especialidadService.listarEspecByProfesional(idProfesional)
        .subscribe(data => {
          if (data.estado == 1) {
            this.especialidadList = data.especialidadList;
            this.filtro.especialidad = data.especialidadList;
          } else {
            this.especialidadList = [];
            this.filtro.especialidad = []
          }
          resolve()
        },
          error => {
            console.error(error);
          });
    })
    return promise
  }


  /* --------------------- */
  selectProfesional(p) {
    this.request.profesional.idProfesional = p.idProfesional;
    // this.request.profesional.medico = p.nombre + ' ' + p.apPaterno + ' ' + p.apMaterno;

    // usando PROMESAS
    this.filtrarEspecialidadMed(p.idProfesional).then(() => {
      this.request.especialidad.idEspecialidad = this.especialidadList[0].idEspecialidad;
    })

  }


  public aceptar() {
    // let navigationExtras: NavigationExtras = {
    //   queryParams: {
    //     data: JSON.stringify(this.request)
    //   }
    // }
    // this._router.navigate(['index/reserva-telecita-medica'], navigationExtras);
    saveBusqueda(JSON.stringify(this.request));
    removeParamsBusqueda();
    this._router.navigate(['index/reserva-telecita-medica']);

  }

  iniciarSesion() {
    window.location.href = this._configuration.getLoginAuth0(this._router.url.split("?")[0]);
  }

  changeTipoBusqueda(event) {
    this.request.especialidad.idEspecialidad = null
    this.request.especialidad.descripcion = null
    this.request.profesional.idProfesional = null
    this.request.profesional.medico = null
    this.listarEspecialidad()

  }

  //PARA VALIDACIONES
  public isInvalid(_controlVar: any): boolean {
    return isInvalid(_controlVar) ||
      (this.busquedaPor == 'especialidad' ? !this.request.especialidad.idEspecialidad :
        (!this.request.especialidad.idEspecialidad && !this.request.profesional.idProfesional));
  }
  public setInputPattern(_event: any, _pattern: any): void {
    setInputPattern(_event, _pattern);
  }
  public setValidatorPattern(_pattern: string, _quantifier: any,
    _exactStart?: boolean, _exactEnd?: boolean, _regexFlags?: string): RegExp {
    return setValidatorPattern(_pattern, _quantifier,
      _exactStart, _exactEnd, _regexFlags);
  }
  public setQuantifier(_quantifier1?: null | number | string, _quantifier2?: null | number): {} {
    return setQuantifier(_quantifier1, _quantifier2);
  }




}

@Component({
  selector: 'dialog-data-example-dialog',
  templateUrl: 'dialog-data-example-dialog.html',
})
export class DialogDataExampleDialog {

  constructor(@Inject(MAT_DIALOG_DATA) public data) { }

  onNoClick(): void {

  }

}
