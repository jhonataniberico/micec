import { HorarioCitaComponent } from '../../shared/components/horario-cita/horario-cita.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProfesionalService } from '../../services/profesional.service';
import { saveSessionId } from '../../core/auth/storage/cabecera.storage';
import { getBusqueda, getParamsBusqueda, saveParamsBusqueda } from '../../core/auth/storage/busqueda.storage';

@Component({
  selector: 'app-reserva-telecita-medica',
  templateUrl: './reserva-telecita-medica.component.html',
  styleUrls: ['./reserva-telecita-medica.component.scss']
})
export class ReservaTelecitaMedicaComponent implements OnInit {

  public profesional = {};
  public precioDesde;
  public precioHasta;
  public calificacion;
  public idSexo;
  public ordenColegiatura = 'ASC';
  public tipoServicio = 2;
  public flagConsulta: boolean = true;
  public profesionalesList = [];

  public parametrosFiltros = null

  public request = {
    especialidad: {
      idEspecialidad: null,
      descripcion: null
    },
    profesional: {
      idProfesional: null,
      medico: null
    }
  };

  public flagSpinner = false;

  constructor(
    private _router: Router,
    private _profesionalService: ProfesionalService) {

    if (getBusqueda()) {
      this.request = JSON.parse(getBusqueda());
      if (getParamsBusqueda()) {
        this.paramsBusqueda(JSON.parse(getParamsBusqueda()))
        this.parametrosFiltros = JSON.parse(getParamsBusqueda())
      }
    } else {
      this._router.navigate(["index"]);
    }
  }

  ngOnInit() {
    this.listarProfByEspec();
  }

  regresar() {
    this._router.navigate(['index']);
    // this.location.back();
  }

  public paramsBusqueda(params: any) {
    this.precioDesde = params.precioDesde;
    this.precioHasta = params.precioHasta;
    this.calificacion = params.calificacion;
    this.idSexo = params.idSexo;
    this.tipoServicio = params.tipoServicio;
    this.ordenColegiatura = params.ordenColegiatura;

    saveParamsBusqueda(JSON.stringify(params))
    this.parametrosFiltros = params
    this.listarProfByEspec();
  }

  public paramsConsulta(params: any) {
    let i = this.profesionalesList.findIndex(element => (element.idProfesional) == params.idProfesional);
    this.profesionalesList[i].servicio = params.servicio;
    this.profesionalesList[i].tarifa = params.tarifa;
  }

  public listarProfByEspec() {
    this.flagSpinner = true
    this.profesionalesList = [];

    let params = {
      idProfesional: this.request.profesional.idProfesional,
      idEspecialidad: this.request.especialidad.idEspecialidad,
      precioDesde: this.precioDesde,
      precioHasta: this.precioHasta,
      calificacion: this.calificacion,
      idSexo: this.idSexo,
      tipoServicio: this.tipoServicio,
      idConsultorio: null,
      ordenColegiatura: this.ordenColegiatura,
      nuPagina: 1,
      nuRegisMostrar: 4
    }

    this._profesionalService.listarProfByEspec(params)
      .subscribe(data => {
        this.flagSpinner = false
        if (data.estado == 1) {
          this.profesionalesList = data.profesionalList;
          this.profesionalesList.forEach(element => {
            element['tipoServicio'] = this.tipoServicio;
            element['ordenColegiatura'] = this.ordenColegiatura;
            element['idEspecialidad'] = this.request.especialidad.idEspecialidad;
          });

          saveSessionId(data.sessionID);
        } else {
          this.profesionalesList = [];
        }
      },
        error => {
          console.error(error);
        }
      );
  }

}
