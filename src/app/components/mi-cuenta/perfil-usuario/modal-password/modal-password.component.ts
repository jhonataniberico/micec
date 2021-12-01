import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { isInvalid, setInputPattern, setQuantifier, setValidatorPattern } from '../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';

@Component({
  selector: 'app-modal-password',
  templateUrl: './modal-password.component.html',
  styleUrls: ['./modal-password.component.scss']
})
export class ModalPasswordComponent implements OnInit {

  @Input() data;

  constructor(public _dialogRef: MatDialogRef<ModalPasswordComponent>) { }

  public request = {
    password: null,
    newPassword: null,
    reNewPassword: null
  }

  public flag1 = false;
  public flag2 = false;
  public flag3 = false;

  ngOnInit() {
    this.request = this.data
    this.request.reNewPassword = this.request.newPassword
    if (this.request.newPassword) {
      this.checkNewPassword()
    }
  }

  public dismiss(result?) {
    this._dialogRef.close(result);
  }

  public savePassword() {
    this.dismiss(this.request)
  }

  public checkNewPassword() {
    let contMa = 0;
    let contMi = 0;
    let contNu = 0;

    for (let i = 0; i < (this.request.newPassword).length; i++) {
      let evaluado = (this.request.newPassword).charAt(i);

      if (isNaN(evaluado)) {
        if (evaluado == (evaluado).toUpperCase()) {
          contMa++;
        }

        if (evaluado == (evaluado).toLowerCase()) {
          contMi++;
        }
      } else {
        contNu++;
      }
    }

    if (contMa > 0) {
      this.flag1 = true;
    } else {
      this.flag1 = false;
    }

    if (contMi > 0) {
      this.flag2 = true;
    } else {
      this.flag2 = false;
    }

    if (contNu > 0) {
      this.flag3 = true;
    } else {
      this.flag3 = false;
    }

  }

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
