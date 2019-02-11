import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Chat } from 'src/app/interfaces/chat.interface';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  chats: Chat[];
  message: string;
  scrollEl: any;

  constructor(private chatService: FirebaseService) {
    this.chatService.loadMessages().subscribe( () => {
      setTimeout(( ) => {
        this.scrollEl.scrollTop = this.scrollEl.scrollHeight;
      }, 20);
    });
  }

  ngOnInit() {
    this.scrollEl = document.getElementById('app-messages');
  }

  sendMessage() {
    console.log(this.message);
    if (this.message.length === 0) {
      return;
    }
    this.chatService
      .sendMessage(this.message)
      .then(() => {
        this.message = '';
      })
      .catch(err => console.error(err));
  }
}
