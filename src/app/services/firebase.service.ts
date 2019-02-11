import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Chat } from '../interfaces/chat.interface';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  public user: any = {};
  public chats: Chat[];
  private itemsCollection: AngularFirestoreCollection<Chat>;

  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) {
    // Escucha cualquier cambio en el estado de la cuenta de la app
    afAuth.authState.subscribe( user => {
      if (!user) {
        return;
      }
      this.user.name = user.displayName;
      this.user.uid = user.uid;
    });
  }

  login() {
    return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  logout() {
    this.user = {};
    this.afAuth.auth.signOut();
  }

  loadMessages() {
    // Obtiene máximo 5 items de la colección chat ordenados por fecha
    this.itemsCollection = this.afs.collection<Chat>('chats', ref =>
      ref.orderBy('date', 'desc').limit(5));

    return this.itemsCollection.valueChanges().pipe(map(messages => {
      this.chats = [];
      for (const message of messages) {
        this.chats.unshift(message);
      }
    }));
  }

  sendMessage(text: string) {
    console.log(this.user);
    const message: Chat = {
      name: this.user.name,
      message: text,
      date: new Date().getTime(),
      uid: this.user.uid
    };

    return this.itemsCollection.add(message);
  }

}
