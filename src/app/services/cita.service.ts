import { Injectable } from '@angular/core';
import { BaseService } from '../shared/services/base.service';
import { Http, URLSearchParams, RequestOptions, Response } from '@angular/http';
import { Configuration } from '../core/configuration/app.constants';
import 'rxjs/add/operator/map';

@Injectable()
export class CitaService extends BaseService {

  private URLCita: String;

  constructor(private _http: Http, private _configuration: Configuration) {
    super();
    this.URLCita = this._configuration.Server + 'cita/';
  }

  public insertarActualizarCitaTemporal(_params) {
    return this._http.post(this.URLCita + 'insertarActualizarCitaTemporal', _params, { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
  }

  public obtenerCitaTemporal(sessionId: string) {
    let queryParams = new URLSearchParams();
    queryParams.append("sessionId", sessionId);
    return this._http.get(this.URLCita + 'obtenerCitaTemporal', { headers: this.obtenerHeaders(), search: queryParams }).map((res: Response) => res.json());
  }

  public insertarActualizarCancelarCita(_params) {
    //Este servicio puede insertar (si mandas idCita null), 
    // actualizar (si mandas el idCita lleno y tipo 1) y 
    // cancelar (si mandas el idCita lleno y tipo 2) una cita
    return this._http.post(this.URLCita + 'insertarActualizarCita', _params, { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
  }

  public insertarActualizarCalificacion(_params) {
    return this._http.post(this.URLCita + 'insertarActualizarCalificacion', _params, { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
  }

  public obtenerPagoCita(_params) {
    let queryParams = new URLSearchParams();
    queryParams.append("idCita", _params.idCita);

    let options = new RequestOptions({
      headers: this.obtenerHeaders(),
      search: queryParams
    });

    return this._http.get(this.URLCita + 'obtenerPagoCita', options).map((res: Response) => res.json());
  }

  public validarTiempoOpinion(data) {
    return this._http.post(this.URLCita + 'validarTiempoOpinion', data, { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
  }

  public listarCitasHistoricasPorUsuario() {
    return this._http.get(this.URLCita + 'listarCitasHistoricasPorUsuario', { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
  }

}
