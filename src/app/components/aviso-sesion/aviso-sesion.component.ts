import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Location } from '@angular/common';
import { Configuration } from '../../core/configuration/app.constants';
import { getSessionId } from '../../core/auth/storage/cabecera.storage';

@Component({
  selector: 'app-aviso-sesion',
  templateUrl: './aviso-sesion.component.html',
  styleUrls: ['./aviso-sesion.component.scss']
})
export class AvisoSesionComponent implements OnInit {

  public authUrl = null;
  public profesional: any;

  constructor(
    private _router: Router,
    private route: ActivatedRoute,
    private _configuration: Configuration) {
    // this.authUrl = this._configuration.getLoginAuth0("/index/confirmar-reserva---" + getSessionId());
    this.authUrl = "/index/confirmar-reserva---" + getSessionId()

    this.route.queryParams.subscribe(params => {
      if (params.data) {
        this.profesional = JSON.parse(params.data);
      }
    }).unsubscribe();
  }

  ngOnInit() {
  }

  public regresar() {
    this._router.navigate(['index/reserva-telecita-medica'])
    // this.location.back();
  }

}
