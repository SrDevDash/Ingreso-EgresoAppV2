import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';
import { IngresoEgreso } from '../Models/ingreso-egreso.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { AppState } from 'src/app/app.reducer';
import {  Subscription } from 'rxjs';
import * as uiActions from '../shared/ui.actions'

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styleUrls: ['./ingreso-egreso.component.css']
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  inputForm: FormGroup;
  tipo: string = 'Ingreso';
  loading: boolean = false;
  uiSub: Subscription;

  constructor(private fb: FormBuilder,
    private ingresoEgresoService: IngresoEgresoService,
    private store: Store<AppState>) {  }



  ngOnInit(): void {
    this.inputForm = this.fb.group({
      description: ['',Validators.required],
      monto: ['',Validators.required],
    });

    this.uiSub = this.store.select('ui').subscribe(
      (ui) => { this.loading = ui.isLoading; }
    );
  }

  ngOnDestroy(): void {
    this.uiSub.unsubscribe();
  }

  guardar(){
    
    this.store.dispatch(uiActions.isLoading());
    
    if(this.inputForm.invalid){
      this.store.dispatch(uiActions.stopLoading()); return; }

    const {description,monto} = this.inputForm.value;
    const ingresoEgresoNew = new IngresoEgreso(description,monto,this.tipo,'');

    this.ingresoEgresoService.crearIngresoEgreso(ingresoEgresoNew)
    .then(
      () => {
        this.inputForm.reset();
        Swal.fire(
          'Registro creado',
          description,
          'success'
        )
      }
    ).catch(
      (err) => {  
        Swal.fire(
          'Error',
          err.message,
          'error'
        )
      }
    );


    this.store.dispatch(uiActions.stopLoading());
    
  }
}
