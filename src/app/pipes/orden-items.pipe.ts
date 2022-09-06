import { Pipe, PipeTransform } from '@angular/core';
import { IngresoEgreso } from '../Models/ingreso-egreso.model';

@Pipe({
  name: 'ordenItems'
})
export class OrdenItemsPipe implements PipeTransform {

  transform(items: IngresoEgreso[] ): IngresoEgreso[] {
    return items.slice().sort( (a, b) => {
      console.log('Primero: ',a,'Segundo: ',b)
      if(a.type === 'Ingreso'){
        return -1;
      }else {
        return 1;
      }
    });
  }

}
