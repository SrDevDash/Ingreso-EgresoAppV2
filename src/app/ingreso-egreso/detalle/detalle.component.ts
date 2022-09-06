import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from 'src/app/Models/ingreso-egreso.model';
import { IngresoEgresoService } from 'src/app/services/ingreso-egreso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit, OnDestroy {

  ingresoEgreso: IngresoEgreso[];
  subReference: Subscription;

  constructor(private store: Store<AppState>, private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit(): void {
    this.subReference = this.store.select('ingresoEgreso').subscribe( ({items}) => {
      this.ingresoEgreso = items;
    })
  }

  ngOnDestroy(): void {
    this.subReference.unsubscribe();
  }

  borrar(uid: string,description: string){
    
    this.ingresoEgresoService.borrarIngresoEgreso(uid).then(
      () => {
        Swal.fire(
          'Eliminado',
          description,
          'warning'
        )
      }
    ).catch(
      err => {
        Swal.fire(
          'Error al eliminar',
          err.message,
          'error'
        )
      }
    );
  }

}
