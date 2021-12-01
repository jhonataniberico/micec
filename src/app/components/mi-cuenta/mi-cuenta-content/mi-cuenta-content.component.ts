import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mi-cuenta-content',
  templateUrl: './mi-cuenta-content.component.html',
  styleUrls: ['./mi-cuenta-content.component.scss']
})
export class MiCuentaContentComponent implements OnInit {

  constructor(public _router: Router) { }

  ngOnInit() {
    // this.goToModule('perfil')
  }

  public goToModule(page) {
    this._router.navigate(['index/mi-cuenta/' + page]);
  }

}
