import { CambiarValoresEncriptados } from './../shared/helpers/cambiar-valores-encriptados/cambiar-valores-encriptados';
import { Injectable } from '@angular/core';
import { BaseService } from '../shared/services/base.service';
import { Http, URLSearchParams, RequestOptions, Response } from '@angular/http';
import { Configuration } from '../core/configuration/app.constants';
import 'rxjs/add/operator/map';

@Injectable()
export class EspecialidadService extends BaseService {

  private URLEspecialidad: String;

  constructor(
    public _http: Http,
    public _configuration: Configuration,
    public _cambiarValores: CambiarValoresEncriptados) {
    super();
    this.URLEspecialidad = this._configuration.Server + 'especialidad/';
  }

  public listarEspecByGrupOcup(idGrupoOcupacional) {
    let queryParams = new URLSearchParams();
    queryParams.append("idGrupoOcupacional", idGrupoOcupacional);

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    return this._http.get(this.URLEspecialidad + 'listarEspecByGrupOcup', options).map((res: Response) => res.json());
  }

  public listarEspecByProfesional(idProfesional) {
    let queryParams = new URLSearchParams();
    queryParams.append("idProfesional", this._cambiarValores.replace(idProfesional));

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    return this._http.get(this.URLEspecialidad + 'listarEspecByMedico', options).map((res: Response) => res.json());
  }




}
