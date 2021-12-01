import { Injectable } from '@angular/core';
import { Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';

@Injectable()
export class AuthenticateHttpService extends Http {

  constructor(_backend: XHRBackend, _defaultOptions: RequestOptions, public _router: Router, public toastr: ToastsManager) {
    super(_backend, _defaultOptions);
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    return super.request(url, options).catch((res: Response) => {
      if ((res.status === 401 || res.status === 403 || res.status === 0) && (window.location.href.match(/\?/g) || []).length < 2) {
        this.toastr.warning("Sesión expirada", "La sesión se cerró");
        this._router.navigate(['index']);
      }
      return Observable.throw(res);
    })
  }

}