import { Injectable } from '@angular/core';
import { BaseService } from '../shared/services/base.service';
import { Http, URLSearchParams, RequestOptions, Response } from '@angular/http';
import { Configuration } from '../core/configuration/app.constants';
import 'rxjs/add/operator/map';

@Injectable()
export class MailService extends BaseService {

  private URLMail: String;

  constructor(private _http: Http, private _configuration: Configuration) {
    super();
    this.URLMail = this._configuration.Server + 'mail/';
  }

  public emailConfirmarCita(_params) {
    return this._http.post(this.URLMail + 'emailConfirmarCita', _params, { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
  }

}
