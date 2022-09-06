import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { doc } from 'firebase/firestore';
import { map } from 'rxjs';
import { IngresoEgreso } from '../Models/ingreso-egreso.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(private firestore: AngularFirestore,
    private authService: AuthService) { }

  crearIngresoEgreso(ingresoEgreso: IngresoEgreso){
    console.log(ingresoEgreso);
   return this.firestore.collection(this.authService.getCurrentUSer().uid).doc('ingreso-egreso').collection('items')
    .add({...ingresoEgreso});
  }

  initIngresoEgresoListenter(uid: string){
    
  return  this.firestore.collection(uid).doc('ingreso-egreso').collection('items').snapshotChanges()
    .pipe(
      map(snapshot => snapshot.map(doc => 
          ({          
            ...doc.payload.doc.data() as any,
            uid: doc.payload.doc.id,
          })
        )
      )
    )
  }

  borrarIngresoEgreso(itemID: string){
   return this.firestore.collection(this.authService.getCurrentUSer().uid)
    .doc('ingreso-egreso').collection('items').doc(itemID).delete();
  }
}
