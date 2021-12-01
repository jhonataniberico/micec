import { CitaService } from './../../../services/cita.service';
import { MatDialogRef } from '@angular/material';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-modal-horario',
  templateUrl: './modal-horario.component.html',
  styleUrls: ['./modal-horario.component.scss']
})
export class ModalHorarioComponent implements OnInit {

  @Input() data;
  @Input() dataCita;

  public horario: any = [];
  public cuposList1: any = [];
  public cuposList2: any = [];
  public cuposList3: any = [];
  public cuposList4: any = [];
  public cantidadHoras = 5;
  public cantidadTotal1 = 0;
  public cantidadTotal2 = 0;
  public cantidadTotal3 = 0;
  public cantidadTotal4 = 0;
  public registrosCargados = 0;
  public nuPagina = 1;
  public nuRegisMostrar = 4;
  public nuTotalReg = 0;
  public cantPermitida = 0;
  public flgMostrar;

  constructor(
    public _toaster: ToastsManager,
    public _router: Router,
    public _citaService: CitaService,
    public _dialogRef: MatDialogRef<ModalHorarioComponent>) { }

  ngOnInit() {
  }

  public modificarCita(request: any) {
    //tipo 1 fijo para modificar la cita
    this._citaService.insertarActualizarCancelarCita(request)
      .subscribe(data => {
        if (data.estado) {
          this._toaster.success("Exitoso", data.mensaje);
          this.dismiss(1);
        } else {
          this._toaster.warning("Advertencia", data.mensaje);
          this.dismiss();
        }
      },
        error => {
          console.error(error);
        }
      );
  }

  public dismiss(result?) {
    this._dialogRef.close(result);
  }

}
