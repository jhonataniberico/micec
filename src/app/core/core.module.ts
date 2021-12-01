import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import { AuthenticateHttpService } from './auth/authenticate-http/authenticate-http.service';
import { Configuration } from './configuration/app.constants';
import { CambiarValoresEncriptados } from '../shared/helpers/cambiar-valores-encriptados/cambiar-valores-encriptados';

@NgModule({
  exports: [
    HttpModule
  ],
  providers: [
    { provide: Http, useClass: AuthenticateHttpService },
    Configuration,
    CambiarValoresEncriptados
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
