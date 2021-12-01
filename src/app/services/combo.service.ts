import { Injectable } from '@angular/core';
import { BaseService } from '../shared/services/base.service';
import { Configuration } from '../core/configuration/app.constants';
import { Http, Response } from '@angular/http';

@Injectable()
export class ComboService extends BaseService{

    private URLCombo: String;

    constructor(
        private _configuration: Configuration,
        private _http: Http) {
        super();
        this.URLCombo = this._configuration.Server + 'combo/';
    }

    public obtenerTipoDocumento(){
        return this._http.get(this.URLCombo + 'obtenerTipoDocumento').map((res: Response) => res.json());
    }

}