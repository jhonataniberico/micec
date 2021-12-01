import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Configuration } from '../core/configuration/app.constants';
import { BaseService } from '../shared/services/base.service';
import 'rxjs/add/operator/map';
import { CambiarValoresEncriptados } from '../shared/helpers/cambiar-valores-encriptados/cambiar-valores-encriptados';

@Injectable()
export class TokenService extends BaseService {

  private URLToken: String;

  constructor(private _http: Http, private _configuration: Configuration, public _cambiarValores: CambiarValoresEncriptados) {
    super();
    this.URLToken = this._configuration.ServerSecurity + 'token/';
  }

  public validateTokenUrl(data) {
    return this._http.post(this.URLToken + 'validateTokenUrl', data, { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
  }

  public obtenerDatosToken(_param) {
    let queryParams = new URLSearchParams();
    if(_param.idUsuario){
      queryParams.append("idUsuario", this._cambiarValores.replace(_param.idUsuario));
    }

    if(_param.email){
      queryParams.append("email", _param.email);
    }

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });
    return this._http.get(this.URLToken + 'obtenerDatosToken', options).map((res: Response) => res.json());
  }

}
