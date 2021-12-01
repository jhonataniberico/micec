import { ModalConfirmacionComponent } from './../modal-confirmacion/modal-confirmacion.component';
import { MatDialog } from '@angular/material';
import { CitaService } from './../../../services/cita.service';
import { Observable } from 'rxjs/Observable';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ProfesionalService } from '../../../services/profesional.service';
import { getSessionId, getIdUsuario } from '../../../core/auth/storage/cabecera.storage';
import { getAuthCode } from '../../../core/auth/storage/token.storage';
import { getBusqueda } from '../../../core/auth/storage/busqueda.storage';

@Component({
  selector: 'app-horario-cita',
  templateUrl: './horario-cita.component.html',
  styleUrls: ['./horario-cita.component.scss']
})
export class HorarioCitaComponent implements OnInit {

  @Input() data;
  @Input() dataCita;
  @Input() mostrarCabecera = true;
  @Input() mostrarCabecera2 = false;
  @Output() params = new EventEmitter();
  @Output() paramsConsulta = new EventEmitter();

  public busqueda: any;
  public horario: any = [];
  public profesional: any = [];
  public cuposList1: any = [];
  public cuposList2: any = [];
  public cuposList3: any = [];
  public cuposList4: any = [];
  public consultoriosList: any = [];
  public cantidadHoras = 5;
  public cantidadTotal1 = 0;
  public cantidadTotal2 = 0;
  public cantidadTotal3 = 0;
  public cantidadTotal4 = 0;
  public registrosCargados = 0;
  public idConsultorio = null;
  public nuPagina = 1;
  public nuRegisMostrar = 4;
  public nuTotalReg = 0;
  public cantPermitida = 0;
  public flgMostrar = true;
  public flgVacio = false;
  public flgConsulta = false;
  public flgConsultorios = true;

  constructor(
    public _router: Router,
    public _modalDialog: MatDialog,
    public _citaService: CitaService,
    public _profesionalService: ProfesionalService) { }

  ngOnInit() {
    if (getBusqueda()) {
      this.busqueda = JSON.parse(getBusqueda());
    }

    if (this.data.programacionList) {
      this.horario = this.data.programacionList;
      this.nuTotalReg = this.horario[0].nuTotalReg;
      this.cantPermitida = this.nuTotalReg / this.nuRegisMostrar;
      this.armarListas();
    } else {
      this.listarProfByEspec();
    }
  }

  public listarProfByEspec() {
    this.limpiarListas();

    let params = {
      idProfesional: this.data.idProfesional,
      idEspecialidad: this.data.idEspecialidad,
      tipoServicio: this.data.tipoServicio,
      idConsultorio: this.idConsultorio,
      ordenColegiatura: this.data.ordenColegiatura,
      nuPagina: this.nuPagina,
      nuRegisMostrar: this.nuRegisMostrar
    }

    this._profesionalService.listarProfByEspec(params)
      .subscribe(data => {
        if (data.estado == 1) {
          if (data.profesionalList.length > 0) {
            this.horario = data.profesionalList[0].programacionList;
            this.profesional = data.profesionalList[0];
            this.nuTotalReg = this.horario[0].nuTotalReg;
            this.cantPermitida = this.nuTotalReg / this.nuRegisMostrar;
            this.flgMostrar = true;
            this.armarListas();
            this.enviarParamsConsulta();
          } else {
            this.flgVacio = true;
          }
        }
      },
        error => {
          console.error(error);
        });
  }

  public armarListas() {
    this.horario.forEach(element => {
      let nuRegistro = element.nuRegistro;

      element.cupoProgramacionList.forEach(e => {
        if (nuRegistro == 1) {
          this.cuposList1.push(e);
          this.cantidadTotal1++;
        } else if (nuRegistro == 2) {
          this.cuposList2.push(e);
          this.cantidadTotal2++;
        } else if (nuRegistro == 3) {
          this.cuposList3.push(e);
          this.cantidadTotal3++;
        } else if (nuRegistro == 4) {
          this.cuposList4.push(e);
          this.cantidadTotal4++;
        }
      });
    });

    this.completarListas();
  }

  public completarListas() {
    let lista = [];
    lista.push(this.cantidadTotal1);
    lista.push(this.cantidadTotal2);
    lista.push(this.cantidadTotal3);
    lista.push(this.cantidadTotal4);

    let max = Math.max(...lista);
    let cantidadEvaluada = 0;

    // Completando lista 1
    if (this.cantidadTotal1 > 0) {
      cantidadEvaluada = this.cantidadTotal1;
      while (cantidadEvaluada < max) {
        let cupo = {
          idCupoProgramacion: 0,
          horaInicio: '-',
          horaFin: '-',
          idProgramacion: '-',
          estado: 'O',
          fecha: this.cuposList1[0].fecha
        }
        cantidadEvaluada++;
        this.cuposList1.push(cupo);
      }
    }

    // Completando lista 2
    if (this.cantidadTotal2 > 0) {
      cantidadEvaluada = this.cantidadTotal2;
      while (cantidadEvaluada < max) {
        let cupo = {
          idCupoProgramacion: 0,
          horaInicio: '-',
          horaFin: '-',
          idProgramacion: '-',
          estado: 'O',
          fecha: this.cuposList2[0].fecha
        }
        cantidadEvaluada++;
        this.cuposList2.push(cupo);
      }
    }

    // Completando lista 3
    if (this.cantidadTotal3 > 0) {
      cantidadEvaluada = this.cantidadTotal3;
      while (cantidadEvaluada < max) {
        let cupo = {
          idCupoProgramacion: 0,
          horaInicio: '-',
          horaFin: '-',
          idProgramacion: '-',
          estado: 'O',
          fecha: this.cuposList3[0].fecha
        }
        cantidadEvaluada++;
        this.cuposList3.push(cupo);
      }
    }

    // Completando lista 4
    if (this.cantidadTotal4 > 0) {
      cantidadEvaluada = this.cantidadTotal4;
      while (cantidadEvaluada < max) {
        let cupo = {
          idCupoProgramacion: 0,
          horaInicio: '-',
          horaFin: '-',
          idProgramacion: '-',
          estado: 'O',
          fecha: this.cuposList4[0].fecha
        }
        cantidadEvaluada++;
        this.cuposList4.push(cupo);
      }
    }

  }

  public limpiarListas() {
    this.horario = [];

    this.cuposList1 = [];
    this.cuposList2 = [];
    this.cuposList3 = [];
    this.cuposList4 = [];
    this.cantidadTotal1 = 0;
    this.cantidadTotal2 = 0;
    this.cantidadTotal3 = 0;
    this.cantidadTotal4 = 0;

    this.cantidadHoras = 5;
    this.flgMostrar = false;
    this.flgVacio = false;
  }

  public verMas() {
    this.cantidadHoras = this.cantidadHoras + 5;
  }

  public verMenos() {
    this.cantidadHoras = this.cantidadHoras - 5;
  }

  public nextPage() {
    this.nuPagina++;
    this.listarProfByEspec();
  }

  public lastPage() {
    this.nuPagina = this.nuPagina - 1;
    this.listarProfByEspec();
  }

  public cambioServicio(servicio) {
    this.data.tipoServicio = servicio;
    this.nuPagina = 1;

    if (servicio == 2) {
      this.flgConsulta = false;
      this.idConsultorio = null;
      this.listarProfByEspec();
    } else if (servicio == 1) {
      this.flgConsulta = true;
      this.getConsultorios();
    }
  }

  public getConsultorios() {
    this.limpiarListas();
    this.flgConsultorios = true;

    let params = {
      idProfesional: this.data.idProfesional,
      idEspecialidad: this.busqueda.especialidad.idEspecialidad
    }

    this._profesionalService.getConsultorios(params)
      .subscribe(data => {
        if (data.estado == 1) {
          this.consultoriosList = data.consultorioList;
        } else {
          this.consultoriosList = [];
          this.flgConsultorios = false;
        }
      },
        error => {
          console.error(error);
        }
      );
  }

  public seleccionConsultorio(id) {
    this.idConsultorio = id;
    this.nuPagina = 1;
    this.listarProfByEspec();
  }

  public registrar(e) {
    if (this.dataCita) {
      this.confirmacion(e);
    } else {
      this.insertarActualizarCitaTemporal(e);
    }
  }

  public confirmacion(e) {
    const dialogRef = this._modalDialog.open(ModalConfirmacionComponent, {
      autoFocus: false,
      // maxWidth: '40%',
      width: '25%',
      // maxHeight: '80%',
      height: '20%',
      disableClose: true,
      hasBackdrop: true,
    });
    dialogRef.componentInstance.mensajeConfirmacion = "¿Está seguro que desea modificar la cita?";
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.modificarCita(e);
      }
    });
  }

  public modificarCita(e) {
    //tipo 1 fijo para modificar la cita

    let request = {
      cita: {
        idCita: this.dataCita.idCita,
        fecha: e.fecha,
        idCupoProgramacion: e.idCupoProgramacion,
        servicio: {
          idServicio: this.data.tipoServicio
        },
        profesional: {
          idProfesional: this.data.idProfesional
        }
      },
      tipo: this.dataCita.tipo
    };

    this.enviarParams(request);
  }

  public enviarParams(request) {
    this.params.emit(request);
  }

  public enviarParamsConsulta() {
    let request = {
      idProfesional: this.profesional.idProfesional,
      servicio: this.profesional.servicio,
      tarifa: this.profesional.tarifa
    }

    this.paramsConsulta.emit(request);
  }

  public insertarActualizarCitaTemporal(e) {
    if (e.estado == 'O') {
      return;
    }

    let _params = {
      citaTemporal: {
        sessionID: getSessionId(),
        usuario: getIdUsuario(),
        cita: {
          idCupoProgramacion: e.idCupoProgramacion,
          hora: e.horaInicio,
          fecha: e.fecha,
          profesional: {
            idProfesional: this.data.idProfesional,
            apPaterno: this.data.apPaterno,
            apMaterno: this.data.apMaterno,
            nombre: this.data.nombre,
            tarifa: this.profesional.tarifa,
            especialidad: {
              idEspecialidad: this.data.idEspecialidad
            },
            especialidades: this.data.especialidades
          }
        }
      }
    }

    this._citaService.insertarActualizarCitaTemporal(_params)
      .subscribe(data => {
        if (data.estado == 1) {
          if (getIdUsuario() && getAuthCode()) {
            this.gotTo('confirmar-reserva');
          } else {
            this.gotTo('aviso-sesion');
          }
        }
        return true;
      },
        error => {
          return Observable.throw(error);
        }
      );
  }

  gotTo(route) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        data: JSON.stringify(this.data)
      }
    }
    this._router.navigate(['index/' + route], navigationExtras);
  }

}
