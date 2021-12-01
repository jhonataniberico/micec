import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.scss']
})
export class StarComponent implements OnInit {

  @Input() paramsEstrellas;
  @Output() rating = new EventEmitter();

  selectedValue: number;

  public flag;
  public star1 = 1;
  public star2 = 1;
  public star3 = 1;
  public star4 = 1;
  public star5 = 1;

  constructor() { }

  ngOnInit() {
    if (this.paramsEstrellas) {
      this.flag = false;
      this.llenandoEstrellas();
    } else {
      this.flag = true;
    }
  }

  public llenandoEstrellas() {
    this.seleccionEstrella(this.paramsEstrellas.entero, this.paramsEstrellas.decimal);
  }

  public seleccionEstrella(star, decimal?) {
    this.selectedValue = star;

    if (star == 1) {
      this.star1 = 2;
      this.star2 = 1;
      this.star3 = 1;
      this.star4 = 1;
      this.star5 = 1;

      if (decimal) {
        this.star2 = 3;
      }
    } else if (star == 2) {
      this.star1 = 2;
      this.star2 = 2;
      this.star3 = 1;
      this.star4 = 1;
      this.star5 = 1;

      if (decimal) {
        this.star3 = 3;
      }
    } else if (star == 3) {
      this.star1 = 2;
      this.star2 = 2;
      this.star3 = 2;
      this.star4 = 1;
      this.star5 = 1;

      if (decimal) {
        this.star4 = 3;
      }
    } else if (star == 4) {
      this.star1 = 2;
      this.star2 = 2;
      this.star3 = 2;
      this.star4 = 2;
      this.star5 = 1;

      if (decimal) {
        this.star5 = 3;
      }
    } else if (star == 5) {
      this.star1 = 2;
      this.star2 = 2;
      this.star3 = 2;
      this.star4 = 2;
      this.star5 = 2;
    }

    this.enviarParams();
  }

  public enviarParams() {
    this.rating.emit(this.selectedValue);
  }
}
