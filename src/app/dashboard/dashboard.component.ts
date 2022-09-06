import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscribe } from '@firebase/util';
import { Store } from '@ngrx/store';
import { filter, Subscription } from 'rxjs';
import { AppState } from '../app.reducer';
import { AuthService } from '../services/auth.service';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import * as ingresoEgresoActions from '../ingreso-egreso/ingresoEgreso.actions'
import { IngresoEgreso } from '../Models/ingreso-egreso.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  datos: string = null;
  subReference: Subscription;
  otherSubReference: Subscription;
  name: string;

  constructor(private userService: AuthService,
    private store: Store<AppState>, private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit(): void {

   this.subReference = this.store.select('auth').pipe(
      filter( user => user.user != null)
    ).subscribe(
      ({user}) => {
        
        this.name = user.nombre;

        this.otherSubReference =  this.ingresoEgresoService.initIngresoEgresoListenter(user.uid)
        .subscribe(ingresoEgreso => {
         
          this.store.dispatch(ingresoEgresoActions.setItems({items: ingresoEgreso}));

        }
          );
      }
    )
  }

  ngOnDestroy(): void {
    this.subReference.unsubscribe();
    this.otherSubReference.unsubscribe(); 
  }



}
