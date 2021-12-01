import { Injectable } from '@angular/core';
import { BaseService } from '../shared/services/base.service';
import { Configuration } from '../core/configuration/app.constants';
import { Http, Response, RequestOptions } from '@angular/http';

@Injectable()
export class SecurityService extends BaseService {

    private URLSecurity: String;

    constructor(
        private __configuration: Configuration,
        private __http: Http) {
        super();
        this.URLSecurity = this.__configuration.ServerSecurity + 'usuario/';
    }

    public registrarPacienteUsuario(request: any) {
        let options = new RequestOptions({
            headers: this.obtenerHeaders()
        });

        return this.__http.post(this.URLSecurity + 'registrarPacienteUsuario', request, options).map((res: Response) => res.json());
    }

    public verificarActivarCuenta(request: any) {
        let options = new RequestOptions({
            headers: this.obtenerHeaders()
        });

        return this.__http.post(this.URLSecurity + 'verificarActivarCuenta', request, options).map((res: Response) => res.json());
    }

    public actualizarPaciente(data) {
        return this.__http.put(this.URLSecurity + 'actualizarPacienteUsuario', data, { headers: this.obtenerHeaders() }).map((res: Response) => res.json());
    }

    public eliminarPacienteUsuario() {
        let options = new RequestOptions({
            headers: this.obtenerHeaders()
        });
        return this.__http.delete(this.URLSecurity + 'eliminarPacienteUsuario', options).map((res: Response) => res.json());
    }

}