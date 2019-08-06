import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Comentario } from '../interfaces/comentario';

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {
  private comentariosCollection: AngularFirestoreCollection<any>;
  comentarios: Observable<any[]>
  nombre:string;
  foto:string;
  uid:string;
  constructor(private afs:AngularFirestore, public afAuth: AngularFireAuth) { 
    afAuth.authState.subscribe(user => {
      console.log(user);
      if(!user){
        return false
      }

      this.nombre = user.displayName;
      this.foto = user.photoURL;
      this.uid = user.uid;

    });
  }

  login(){
    this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }


  getComentarios():Observable<any>{
    this.comentariosCollection = this.afs.collection<any>('comentarios');
    return this.comentarios = this.comentariosCollection.valueChanges();
  }


  addComentarios(texto:string){
 
    let comentarios: Comentario = {
      nombre: this.nombre,
      foto: this.foto,
      comentario: texto,
      fecha: new Date().getTime(),
      uid: this.uid
    }

    console.log(comentarios);
    
     return this.comentariosCollection.add(comentarios);
  }
}
