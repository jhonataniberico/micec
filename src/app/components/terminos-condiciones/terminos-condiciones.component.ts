import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-terminos-condiciones',
  templateUrl: './terminos-condiciones.component.html',
  styleUrls: ['./terminos-condiciones.component.scss']
})
export class TerminosCondicionesComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
  }

  regresarCrearCuentaI() {
    this._router.navigate(['index/crear-cuenta']);
  }


}
