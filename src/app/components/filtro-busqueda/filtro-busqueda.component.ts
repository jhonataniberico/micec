import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { isInvalid, setInputPattern, setValidatorPattern, setQuantifier } from '../../shared/helpers/custom-validators/validators-messages/validators-messages.component';


@Component({
  selector: 'app-filtro-busqueda',
  templateUrl: './filtro-busqueda.component.html',
  styleUrls: ['./filtro-busqueda.component.scss']
})
export class FiltroBusquedaComponent implements OnInit {


  @Input() parametros;
  @Output() paramsBusqueda = new EventEmitter();
  

  public precioDesde;
  public precioHasta;
  public ordenColegiatura = 'ASC';
  public tipoServicio = 2;
  public checkPrecio1 = null;
  public checkPrecio2 = null;
  public checkPrecio3 = null;
  public checkEstrella1 = null;
  public checkEstrella2 = null;
  public checkEstrella3 = null;
  public checkEstrella4 = null;
  public checkEstrella5 = null;
  public checkSexo1 = null;
  public checkSexo2 = null;

  public request: any = {};

  public panelOpenState : boolean;
  
  constructor() { }

  ngOnInit() {
    if (this.parametros) {
      this.llenarDatosTraidos()
      
    } else {
      this.request.ordenColegiatura = this.ordenColegiatura;
      this.request.tipoServicio = 2;
    }

  }

  public llenarDatosTraidos() {
    this.request = this.parametros;

    if (!this.parametros.precioDesde && this.parametros.precioHasta == 50) {
      this.checkPrecio1 = true
    } else if (this.parametros.precioDesde == 50 && this.parametros.precioHasta == 100) {
      this.checkPrecio2 = true
    } else if (this.parametros.precioDesde == 100 && !this.parametros.precioHasta) {
      this.checkPrecio3 = true
    } else {
      this.precioDesde = this.parametros.precioDesde
      this.precioHasta = this.parametros.precioHasta
    }

    if (this.parametros.calificacion == 1) {
      this.checkEstrella1 = true
    } else if (this.parametros.calificacion == 2) {
      this.checkEstrella2 = true
    } else if (this.parametros.calificacion == 3) {
      this.checkEstrella3 = true
    } else if (this.parametros.calificacion == 4) {
      this.checkEstrella4 = true
    } else if (this.parametros.calificacion == 5) {
      this.checkEstrella5 = true
    }

    if (this.parametros.idSexo == 1) {
      this.checkSexo1 = true
    } else if (this.parametros.idSexo == 2) {
      this.checkSexo2 = true
    }

    this.ordenColegiatura = this.parametros.ordenColegiatura;
    this.tipoServicio = this.parametros.tipoServicio;
  }

  public busquedaPrecio(p?, n?) {
    if (p) {
      this.checkPrecio1 = false;
      this.checkPrecio2 = false;
      this.checkPrecio3 = false;

      if (this.precioDesde > 0 && this.precioHasta > 0) {
        this.request.precioDesde = this.precioDesde;
        this.request.precioHasta = this.precioHasta;
      } else {
        return;
      }

    } else if (n == 1) {
      
      this.checkPrecio2 = false;
      this.checkPrecio3 = false;
      this.precioDesde = null;
      this.precioHasta = null;

      if (this.checkPrecio1) {
        this.request.precioDesde = null;
        this.request.precioHasta = 50;
      } else {
        this.request.precioDesde = null;
        this.request.precioHasta = null;
      }
    } else if (n == 2) {
      this.checkPrecio1 = false;
      this.checkPrecio3 = false;
      this.precioDesde = null;
      this.precioHasta = null;

      if (this.checkPrecio2) {
        this.request.precioDesde = 50;
        this.request.precioHasta = 100;
      } else {
        this.request.precioDesde = null;
        this.request.precioHasta = null;
      }
    } else if (n == 3) {
      this.checkPrecio1 = false;
      this.checkPrecio2 = false;
      this.precioDesde = null;
      this.precioHasta = null;

      if (this.checkPrecio3) {
        this.request.precioDesde = 100;
        this.request.precioHasta = null;
      } else {
        this.request.precioDesde = null;
        this.request.precioHasta = null;
      }
    }
    this.enviarParams();
  }

  public busquedaEstrella(n) {
    if (n == 1) {
      this.checkEstrella2 = false;
      this.checkEstrella3 = false;
      this.checkEstrella4 = false;
      this.checkEstrella5 = false;

      if (this.checkEstrella1) {
        this.request.calificacion = 1;
      } else {
        this.request.calificacion = null;
      }
    } else if (n == 2) {
      this.checkEstrella1 = false;
      this.checkEstrella3 = false;
      this.checkEstrella4 = false;
      this.checkEstrella5 = false;

      if (this.checkEstrella2) {
        this.request.calificacion = 2;
      } else {
        this.request.calificacion = null;
      }
    } else if (n == 3) {
      this.checkEstrella1 = false;
      this.checkEstrella2 = false;
      this.checkEstrella4 = false;
      this.checkEstrella5 = false;

      if (this.checkEstrella3) {
        this.request.calificacion = 3;
      } else {
        this.request.calificacion = null;
      }
    } else if (n == 4) {
      this.checkEstrella1 = false;
      this.checkEstrella2 = false;
      this.checkEstrella3 = false;
      this.checkEstrella5 = false;

      if (this.checkEstrella4) {
        this.request.calificacion = 4;
      } else {
        this.request.calificacion = null;
      }
    } else if (n == 5) {
      this.checkEstrella1 = false;
      this.checkEstrella2 = false;
      this.checkEstrella3 = false;
      this.checkEstrella4 = false;

      if (this.checkEstrella5) {
        this.request.calificacion = 5;
      } else {
        this.request.calificacion = null;
      }
    }
    this.enviarParams();
  }

  public busquedaSexo(n) {
    if (n == 1) {
      this.checkSexo2 = false;

      if (this.checkSexo1) {
        this.request.idSexo = 1;
      } else {
        this.request.idSexo = null;
      }
    } else if (n == 2) {
      this.checkSexo1 = false;

      if (this.checkSexo2) {
        this.request.idSexo = 2;
      } else {
        this.request.idSexo = null;
      }
    }
    this.enviarParams();
  }

  public busquedaModalidad() {
    this.request.tipoServicio = this.tipoServicio;
    this.enviarParams();
  }

  public busquedaOrdenColeg() {
    this.request.ordenColegiatura = this.ordenColegiatura;
    this.enviarParams();
  }

  public enviarParams() {

    this.paramsBusqueda.emit(this.request);
  }


  //Validadores

  public isInvalid(_ngForm: any): boolean {
    return isInvalid(_ngForm);
  }
  public setInputPattern(_event: any, _pattern: any): void {
    setInputPattern(_event, _pattern);
  }
  public setValidatorPattern(_pattern: string, _quantifier: any, _exactStart?: boolean, _exactEnd?: boolean, _regexFlags?: string): RegExp {
    return setValidatorPattern(_pattern, _quantifier, _exactStart, _exactEnd, _regexFlags);
  }
  public setQuantifier(_quantifier1?: null | number | string, _quantifier2?: null | number): {} {
    return setQuantifier(_quantifier1, _quantifier2);
  }
}
