import { Component,  OnDestroy,  OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { AuthService } from 'src/app/services/auth.service';
import {Store} from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as ui from 'src/app/shared/ui.actions';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  loading: boolean = false;
  uiSub: Subscription;

  constructor(private fb: FormBuilder,private authService: AuthService, private router: Router
    ,private store: Store<AppState>) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['',[Validators.required,Validators.email]],
      password: ['',Validators.required],
    });
    // Recibir del Store variable IsLoading Subcribe
   this.uiSub = this.store.select('ui').subscribe(
      (ui) => {
        this.loading = ui.isLoading;
      }
    )
  }
    ngOnDestroy(): void {
      this.uiSub.unsubscribe();
    }

  login(){
    this.store.dispatch(ui.isLoading());
    Swal.fire({
      title: 'Cargando usuario',
      didOpen: () => {
        Swal.showLoading()
      }
    });
    if(this.loginForm.valid){
      const {email,password} = this.loginForm.value;
      
      this.authService.loginUsuario(email,password).then(
        (credenciales => {
          this.store.dispatch(ui.stopLoading());
          Swal.close();
          this.router.navigate(['/']);
        }),
        (err) => {
          this.store.dispatch(ui.stopLoading());
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.message,
          })
        }
      );
    }
    else{
      console.log('Formulario invalido');
    }
  }

}
