import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import { setUser, unSetUser } from '../Auth/auth.actions';
import { unSetItems } from '../ingreso-egreso/ingresoEgreso.actions';
import { User } from '../Models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubscription: Subscription;
  private _user: User;

  constructor(public auth: AngularFireAuth, private fireStore: AngularFirestore,
    private store: Store<AppState>) {

   }

  initAuthListener(){
    // lisetener para sabar cuando se inicia sesion o cierra 
    this.auth.authState.subscribe(fuser => {
      if(fuser){
      //  this.store.dispatch(setUser());
     this.userSubscription = this.fireStore.collection(fuser.uid).doc('usuario').valueChanges().subscribe(
        (userA: any) => {
          const user = User.userFirebase(userA);    
          this._user = user;    
          this.store.dispatch(setUser({user}));
        }
      )
      }
      else {
        if(this.userSubscription){
          this.store.dispatch(unSetItems());
          this._user = null;
          this.userSubscription.unsubscribe();
        }
        
        this.store.dispatch(unSetUser());
      }
      
    })
  }

  crearUsuario(nombre:string , correo:string, password:string){
    console.log(nombre,correo,password);
    return this.auth.createUserWithEmailAndPassword(correo,password).then(
      ({user}) => {

        const newUser = new User(user.uid,nombre,user.email);

        this.fireStore.doc(user.uid+'/usuario').set({...newUser});
      },
    );
  }

  loginUsuario(correo:string, password:string){
    console.log('[ServiceLogin] Login usuario: ' + correo);  
    return this.auth.signInWithEmailAndPassword(correo,password);
  }

  logout(){
   return this.auth.signOut();
  }

  isAuth(){
    return this.auth.authState.pipe(
      map(fbUser => fbUser != null)
    );
  }

  getUser(uid:string){
    return this.fireStore.collection(uid).doc('usuario').valueChanges();
  }

  getCurrentUSer(){
    return this._user;
  }

  
}
