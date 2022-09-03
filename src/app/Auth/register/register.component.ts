import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import {Store} from '@ngrx/store';
import * as ui from 'src/app/shared/ui.actions';
import {Subscription} from 'rxjs';
import { AppState } from 'src/app/app.reducer';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  formGroup: FormGroup;
  loading: boolean = false;
  uiSub: Subscription;

  constructor(private fb: FormBuilder, private authService: AuthService, private routers: Router,
    private store: Store<AppState>) { }


  ngOnInit(): void {

    this.formGroup = this.fb.group({
      nombre: ['',Validators.required],
      correo: ['',[Validators.required,Validators.email]],
      password: ['',Validators.required],
    });
    this.uiSub = this.store.select('ui').subscribe(
      (data) => {
        this.loading = data.isLoading;
      }
    );
  }

  ngOnDestroy(): void {
    this.uiSub.unsubscribe();
  }

  crearUsuario(){  
    if(this.formGroup.valid){
      this.store.dispatch(ui.isLoading());
      const {nombre, correo, password} = this.formGroup.value;

      this.authService.crearUsuario(nombre,correo,password).then
      (credenciales => {
        this.store.dispatch(ui.stopLoading());
        this.routers.navigate(['/']);
        console.log(credenciales);
      }).catch(err => {
        this.store.dispatch(ui.stopLoading());
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message,
        })
      });
    }
  }

}
