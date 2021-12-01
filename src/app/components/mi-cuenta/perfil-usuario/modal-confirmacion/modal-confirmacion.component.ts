import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-modal-confirmacion',
  templateUrl: './modal-confirmacion.component.html',
  styleUrls: ['./modal-confirmacion.component.scss']
})
export class ModalConfirmacionComponent implements OnInit {

  constructor(public _dialogRef: MatDialogRef<ModalConfirmacionComponent>) { }

  ngOnInit() {
  }

  public dismiss(result?) {
    this._dialogRef.close(result);
  }

}
