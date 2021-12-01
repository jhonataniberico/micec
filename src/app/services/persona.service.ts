import { Injectable } from '@angular/core';
import { BaseService } from '../shared/services/base.service';
import { Http, URLSearchParams, Response, RequestOptions } from '@angular/http';
import { Configuration } from '../core/configuration/app.constants';
import 'rxjs/add/operator/map';

@Injectable()
export class PersonaService extends BaseService {

  private URLPersona: String;

  constructor(private _http: Http, private _configuration: Configuration) {
    super();
    this.URLPersona = this._configuration.Server + 'persona/';
  }

  public listarPersona() {
    let queryParams = new URLSearchParams();
    queryParams.append("nombre", "nombre");

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    return this._http.get(this.URLPersona + 'listarPersona', options).map((res: Response) => res.json());
  }

}
