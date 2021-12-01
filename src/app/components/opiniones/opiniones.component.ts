import { Component, OnInit, Input } from '@angular/core';
import { ProfesionalService } from '../../services/profesional.service';

@Component({
  selector: 'app-opiniones',
  templateUrl: './opiniones.component.html',
  styleUrls: ['./opiniones.component.scss']
})
export class OpinionesComponent implements OnInit {

  @Input() profesional;

  public opinionList: any = [];
  public paramsEstrellas;

  constructor(
    public _profesionalService: ProfesionalService) {

  }

  ngOnInit() {
    this.getOpiniones();

  }

  getOpiniones() {
    let request = {
      idProfesional: this.profesional.idProfesional
    }

    this._profesionalService.getOpiniones(request)
      .subscribe(
        data => {
          if (data.estado == 1) {
            this.opinionList = data.opinionList;
            this.llenarEstrellas();
          } else {
            this.opinionList = [];
          }
        },
        error => {
          console.error(error);
        }
      );
  }

  public llenarEstrellas() {
    //Llenando las estrellas general
    let enteroF = Math.floor(this.opinionList[0].calificacionGeneral);

    this.paramsEstrellas = {
      entero: enteroF,
      decimal: this.opinionList[0].calificacionGeneral > enteroF ? true : false
    }


    //Llenando las estrellas detalle
    this.opinionList.forEach(e => {
      let enteroFD = Math.floor(e.calificacion);

      let paramsEstrellasD = {
        entero: enteroFD,
        decimal: e.calificacion > enteroFD ? true : false
      }
      e['paramsEstrellasD'] = paramsEstrellasD;
    });

  }

}
