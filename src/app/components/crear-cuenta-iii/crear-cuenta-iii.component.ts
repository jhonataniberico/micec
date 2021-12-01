import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-cuenta-iii',
  templateUrl: './crear-cuenta-iii.component.html',
  styleUrls: ['./crear-cuenta-iii.component.scss']
})
export class CrearCuentaIiiComponent implements OnInit {

  constructor(private _router: Router) { }

  public regresar() {
    this._router.navigate(['index/crear-cuentaII'])
  }

  public siguiente() {
    this._router.navigate(['index/confirmar-reserva']);
  }

  ngOnInit() {
  }

}
