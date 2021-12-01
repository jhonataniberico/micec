import { Injectable } from '@angular/core';
import { BaseService } from '../shared/services/base.service';
import { Http, URLSearchParams, Response, RequestOptions } from '@angular/http';
import { Configuration } from '../core/configuration/app.constants';
import 'rxjs/add/operator/map';

@Injectable()
export class PacienteService extends BaseService {

  private URLPersona: String;
  private URLPaciente: String;

  constructor(private _http: Http, private _configuration: Configuration) {
    super();
    this.URLPersona = this._configuration.Server + 'paciente/';
    this.URLPaciente = this._configuration.ServerSecurity + 'paciente/';
  }

  public obtenerPacientePorIdUsuario(idUsuario: string) {
    let queryParams = new URLSearchParams();
    queryParams.append("idUsuario", idUsuario);
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    return this._http.get(this.URLPersona + 'obtenerPacientePorIdUsuario', options).map((res: Response) => res.json());
  }

  public obtenerPacienteUsuario(idUsuario: string) {
    let queryParams = new URLSearchParams();
    queryParams.append("idUsuario", idUsuario);
    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    return this._http.get(this.URLPaciente + 'obtenerPacienteUsuario', options).map((res: Response) => res.json());
  }

}
