import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-iniciar',
  templateUrl: './iniciar.component.html',
  styleUrls: ['./iniciar.component.scss']
})

export class IniciarComponent implements OnInit {

  constructor(public _router: Router, public dialogRef: MatDialogRef<IniciarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  close(add?): void {
    this.dialogRef.close(add);
  }


  public CrearCuenta() {
    this._router.navigate(['index/crear-cuenta'])
  }


}
