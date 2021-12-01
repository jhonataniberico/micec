import { Injectable } from '@angular/core';
import { BaseService } from '../shared/services/base.service';
import { Headers, Http, Response } from '@angular/http';
import { Configuration } from '../core/configuration/app.constants';
import 'rxjs/add/operator/map';

@Injectable()
export class UsuarioService extends BaseService {

  private URLUsuario: String;

  constructor(private _http: Http, private _configuration: Configuration) {
    super();
    this.URLUsuario = this._configuration.ServerSecurity + 'usuario/';
  }

  public activarPacienteUsuario(data) {
    return this._http.post(this.URLUsuario + 'activarPacienteUsuario', data, { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
  }

  public loginUser(data) {
    let headers = new Headers()
    headers = this.obtenerHeaders()
    headers.append('clientId', this._configuration.$clientId)
    return this._http.post(this.URLUsuario + 'loginUser', data, { headers: headers }).map((res: Response) => res.json());
  }

}
