import { CambiarValoresEncriptados } from './../shared/helpers/cambiar-valores-encriptados/cambiar-valores-encriptados';
import { Injectable } from '@angular/core';
import { BaseService } from '../shared/services/base.service';
import { Configuration } from '../core/configuration/app.constants';
import { Http, RequestOptions, Response, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { saveIdProfesionalH } from '../core/auth/storage/cabecera.storage';

@Injectable()
export class ProfesionalService extends BaseService {

  private URLProfesional: String;
  private URLConsultorio: String;

  constructor(
    public _http: Http,
    public _configuration: Configuration,
    public _cambiarValores: CambiarValoresEncriptados) {
    super();
    this.URLProfesional = this._configuration.Server + 'profesional/';
    this.URLConsultorio = this._configuration.Server + 'consultorio/';
  }

  public listarProfesionales() {
    let options = new RequestOptions({
      headers: this.obtenerHeaders()
    });
    return this._http.get(this.URLProfesional + 'listarProfesionales', options).map((res: Response) => res.json());
  }

  public listarProfByEspec(_params) {
    let queryParams = new URLSearchParams();

    if (_params.idProfesional) {
      queryParams.append("idProfesional", this._cambiarValores.replace(_params.idProfesional));
    }
    if (_params.idEspecialidad) {
      queryParams.append("idEspecialidad", _params.idEspecialidad);
    }
    if (_params.precioDesde) {
      queryParams.append("precioDesde", _params.precioDesde);
    }
    if (_params.precioHasta) {
      queryParams.append("precioHasta", _params.precioHasta);
    }
    if (_params.calificacion) {
      queryParams.append("calificacion", _params.calificacion);
    }
    if (_params.idSexo) {
      queryParams.append("idSexo", _params.idSexo);
    }
    if (_params.tipoServicio) {
      queryParams.append("tipoServicio", _params.tipoServicio);
    }
    if (_params.idConsultorio) {
      queryParams.append("idConsultorio", _params.idConsultorio);
    }
    if (_params.ordenColegiatura) {
      queryParams.append("ordenColegiatura", _params.ordenColegiatura);
    }
    if (_params.nuPagina) {
      queryParams.append("nuPagina", _params.nuPagina);
    }
    if (_params.nuRegisMostrar) {
      queryParams.append("nuRegisMostrar", _params.nuRegisMostrar);
    }

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    return this._http.get(this.URLProfesional + 'listarProfByEspec', options).map((res: Response) => res.json());
  }

  public getOpiniones(_params) {
    let queryParams = new URLSearchParams();

    if (_params.idProfesional) {
      queryParams.append("idProfesional", this._cambiarValores.replace(_params.idProfesional));
    }

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    return this._http.get(this.URLProfesional + 'obtenerOpiniones', options).map((res: Response) => res.json());
  }

  public getConsultorios(_params) {
    let queryParams = new URLSearchParams();

    if (_params.idEspecialidad) {
      queryParams.append("idEspecialidad", _params.idEspecialidad);
    }
    if (_params.idProfesional) {
      queryParams.append("idProfesional", this._cambiarValores.replace(_params.idProfesional));
    }

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    return this._http.get(this.URLConsultorio + 'obtenerConsultorio', options).map((res: Response) => res.json());
  }

}
