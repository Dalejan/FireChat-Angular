import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FirebaseService } from './services/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  chats: Observable<any[]>;
  constructor(db: AngularFirestore, private chatService: FirebaseService) {
  }

  logout() {
    this.chatService.logout();
  }
}
