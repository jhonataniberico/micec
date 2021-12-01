import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CitaService } from '../../../services/cita.service';

@Component({
  selector: 'app-redirect-opinion',
  templateUrl: './redirect-opinion.component.html',
  styleUrls: ['./redirect-opinion.component.scss']
})
export class RedirectOpinionComponent implements OnInit {

  constructor(private _activatedRoute: ActivatedRoute,
    private _citaService: CitaService,
    private _router: Router) {
    this._activatedRoute.queryParams.subscribe(params => {
      if (params["tokenOpinion"]) {
        this.request.tokenOpinion = params["tokenOpinion"];
      }
    });
  }

  public request = {
    tokenOpinion: null
  };

  public showContent = false;

  ngOnInit() {
    if (this.request.tokenOpinion) {
      this.validarTiempoOpinion()
    } else {
      setTimeout(() => {
        this._router.navigate(['index'])
      });
    }
  }

  validarTiempoOpinion() {
    this._citaService.validarTiempoOpinion(this.request)
      .subscribe(data => {
        if (data.estado == 1) {
          this._router.navigate(['index/opinion-paciente']);
        } else {
          this.showContent = true;
          this._router.navigate(['index'], { queryParams: { validate: false } })
        }
      },
        error => {
          console.error(error);
        });
  }

  regresar() {
    this._router.navigate(['index'])
  }

}
