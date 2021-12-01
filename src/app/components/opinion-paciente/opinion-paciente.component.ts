import { CitaService } from './../../services/cita.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ToastsManager } from 'ng2-toastr';
;

@Component({
  selector: 'app-opinion-paciente',
  templateUrl: './opinion-paciente.component.html',
  styleUrls: ['./opinion-paciente.component.scss']
})
export class OpinionPacienteComponent implements OnInit {

  public calificacion = 0;
  public opinion;
  public puntualidadGusto = 0;
  public explicacionDetalladaGusto = 0;
  public dedicacionEntrevistaGusto = 0;
  public eficaciaGusto = 0;
  public pacienciaGusto = 0;
  public otroGusto = 0;
  public puntualidadMejorar = 0;
  public explicacionDetalladaMejorar = 0;
  public dedicacionEntrevistaMejorar = 0;
  public eficaciaMejorar = 0;
  public pacienciaMejorar = 0;
  public otroMejorar = 0;

  public checkActivar = false;
  public existeGusto = false;
  public existeMejorar = false;

  public profesional: any;
  public idCita;
  public flag: boolean = false;
  public flag2: boolean = true;

  constructor(
    public _toaster: ToastsManager,
    public _citaService: CitaService,
    public _router: Router,
    public route: ActivatedRoute,
    public location: Location) {

    this.route.queryParams.subscribe(params => {
      if (params.data) {
        let data = JSON.parse(params.data);
        this.profesional = data.profesional;
        this.idCita = data.idCita;
      }
    }).unsubscribe();
  }

  ngOnInit() {
    window.scroll(0, 0);
  }

  // public mostrarOpinionEnviada() {
  //   this.flag = true;
  //   this.flag2 = false;
  // }

  public ratingSelected(rating) {
    this.calificacion = rating;
  }

  public marcarOpcion(opcion) {

    if (opcion == 1) {
      if (this.puntualidadGusto == 1) {
        this.puntualidadGusto = 0;
      } else {
        this.puntualidadGusto = 1;
      }

    } else if (opcion == 2) {
      if (this.explicacionDetalladaGusto == 1) {
        this.explicacionDetalladaGusto = 0;
      } else {
        this.explicacionDetalladaGusto = 1;
      }

    } else if (opcion == 3) {
      if (this.dedicacionEntrevistaGusto == 1) {
        this.dedicacionEntrevistaGusto = 0;
      } else {
        this.dedicacionEntrevistaGusto = 1;
      }

    } else if (opcion == 4) {
      if (this.eficaciaGusto == 1) {
        this.eficaciaGusto = 0;
      } else {
        this.eficaciaGusto = 1;
      }

    } else if (opcion == 5) {
      if (this.pacienciaGusto == 1) {
        this.pacienciaGusto = 0;
      } else {
        this.pacienciaGusto = 1;
      }

    } else if (opcion == 6) {
      if (this.otroGusto == 1) {
        this.otroGusto = 0;
      } else {
        this.otroGusto = 1;
      }

    } else if (opcion == 7) {
      if (this.puntualidadMejorar == 1) {
        this.puntualidadMejorar = 0;
      } else {
        this.puntualidadMejorar = 1;
      }

    } else if (opcion == 8) {
      if (this.explicacionDetalladaMejorar == 1) {
        this.explicacionDetalladaMejorar = 0;
      } else {
        this.explicacionDetalladaMejorar = 1;
      }

    } else if (opcion == 9) {
      if (this.dedicacionEntrevistaMejorar == 1) {
        this.dedicacionEntrevistaMejorar = 0;
      } else {
        this.dedicacionEntrevistaMejorar = 1;
      }

    } else if (opcion == 10) {
      if (this.eficaciaMejorar == 1) {
        this.eficaciaMejorar = 0;
      } else {
        this.eficaciaMejorar = 1;
      }

    } else if (opcion == 11) {
      if (this.pacienciaMejorar == 1) {
        this.pacienciaMejorar = 0;
      } else {
        this.pacienciaMejorar = 1;
      }

    } else if (opcion == 12) {
      if (this.otroMejorar == 1) {
        this.otroMejorar = 0;
      } else {
        this.otroMejorar = 1;
      }
    }


    //Verificando que haya elegido al menos una opcion de cada bloque
    if (opcion >= 1 && opcion <= 6) {
      if (this.puntualidadGusto == 0 && this.explicacionDetalladaGusto == 0 && this.dedicacionEntrevistaGusto == 0 && this.eficaciaGusto == 0 && this.pacienciaGusto == 0 && this.otroGusto == 0) {
        this.existeGusto = false;
      } else {
        this.existeGusto = true;
      }

    } else if (opcion >= 7 && opcion <= 12) {
      if (this.puntualidadMejorar == 0 && this.explicacionDetalladaMejorar == 0 && this.dedicacionEntrevistaMejorar == 0 && this.eficaciaMejorar == 0 && this.pacienciaMejorar == 0 && this.otroMejorar == 0) {
        this.existeMejorar = false;
      } else {
        this.existeMejorar = true;
      }
    }
  }

  public insertarActualizarCalificacion() {

    let request = {
      calificacionCita: {
        idCita: this.idCita,
        calificacion: this.calificacion,
        opinion: this.opinion,
        puntualidadGusto: this.puntualidadGusto,
        explicacionDetalladaGusto: this.explicacionDetalladaGusto,
        dedicacionEntrevistaGusto: this.dedicacionEntrevistaGusto,
        eficaciaGusto: this.eficaciaGusto,
        pacienciaGusto: this.pacienciaGusto,
        otroGusto: this.otroGusto,
        puntualidadMejorar: this.puntualidadMejorar,
        explicacionDetalladaMejorar: this.explicacionDetalladaMejorar,
        dedicacionEntrevistaMejorar: this.dedicacionEntrevistaMejorar,
        eficaciaMejorar: this.eficaciaMejorar,
        pacienciaMejorar: this.pacienciaMejorar,
        otroMejorar: this.otroMejorar
      }
    }

    this._citaService.insertarActualizarCalificacion(request)
      .subscribe(data => {
        if (data.estado == 1) {
          this._toaster.success("Exitoso", data.mensaje);
          this._router.navigate(['index/mi-cuenta/citas']);
        } else {
          this._toaster.warning("Advertencia", data.mensaje);
        }
      },
        error => {
          console.error(error);
        }
      );
    // this.mostrarOpinionEnviada();
  }

  public regresar() {
    this.location.back();
  }

}