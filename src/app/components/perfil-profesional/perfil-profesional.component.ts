import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router'; // Importar
import { Location } from '@angular/common';

@Component({
  selector: 'app-perfil-profesional',
  templateUrl: './perfil-profesional.component.html',
  styleUrls: ['./perfil-profesional.component.scss']
})
export class PerfilProfesionalComponent implements OnInit {

  public profesional = {};
  public dataCita: any;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public location: Location) {
    this.route.queryParams.subscribe(params => {
      if (params.data) {
        this.profesional = JSON.parse(params.data);
      }
    }).unsubscribe();
  }



  ngOnInit() {
    // mandar scroll a parte superior de la pantalla
    window.scroll(0,0)
  }


  public dejarOpinion() {

  }

  public regresar() {
    this.location.back();
  }

}
