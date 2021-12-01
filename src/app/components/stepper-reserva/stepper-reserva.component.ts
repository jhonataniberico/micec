import { Component, OnInit, Input } from '@angular/core';
import { MatInput } from '@angular/material';


@Component({
  selector: 'app-stepper-reserva',
  templateUrl: './stepper-reserva.component.html',
  styleUrls: ['./stepper-reserva.component.scss']
})
export class StepperReservaComponent implements OnInit {

  @Input() nombrePaso;
 
  constructor() { }

  public busqueda: boolean= false;
  public seleccion : boolean = false;
  public identificacion : boolean = false;
  public reservaRealizada : boolean = false;
  public color="stepColorAzul";
 
 
  ngOnInit() {
    if(this.nombrePaso=="1"){
      this.busqueda=true;
             
    }
    if(this.nombrePaso=="2"){
      this.busqueda=true; 
      this.seleccion=true;      
    }
    if(this.nombrePaso=="3"){
      this.busqueda=true;  
      this.seleccion=true; 
      this.identificacion=true;     
    }
    if(this.nombrePaso=="4"){
      this.busqueda=true;  
      this.seleccion=true; 
      this.identificacion=true;  
      this.reservaRealizada=true;   
    }
  }
}
