import { Component, Input, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router'

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.scss']
})
export class MedicoComponent implements OnInit {

  @Input() flgShowButton = false;
  @Input() medico;

  public paramEstrella: any;

  constructor(public _router: Router) {
  }

  ngOnInit() {
    if (this.medico) {
      let enteroF = Math.floor(this.medico.calificacion);

      this.paramEstrella = {
        entero: enteroF,
        decimal: this.medico.calificacion > enteroF ? true : false
      }
    }

  }

  verPerfil() {

    let navigationExtras: NavigationExtras = {
      queryParams: {
        data: JSON.stringify(this.medico)
      }
    }

    this._router.navigate(['index/perfil-profesional'], navigationExtras);


  }

}