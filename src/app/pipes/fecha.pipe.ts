import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fecha'
})
export class FechaPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let fecha = new Date(value);

    let stringFecha = (fecha.getDate() + 1) + '/' + (fecha.getMonth() < 9 ? '0' : '') + (fecha.getMonth() + 1) + '/' + fecha.getFullYear()

    switch (fecha.getDay() + 1) {
      case 1:
        return 'lunes ' + stringFecha;

      case 2:
        return 'martes ' + stringFecha;

      case 3:
        return 'miércoles ' + stringFecha;

      case 4:
        return 'jueves ' + stringFecha;

      case 5:
        return 'viernes ' + stringFecha;

      case 6:
        return 'sábado ' + stringFecha;

      default:
        return 'domingo ' + stringFecha;
    }
  }

}
