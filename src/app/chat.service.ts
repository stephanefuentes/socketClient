import { Injectable } from "@angular/core";
import { Message } from './message';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class ChatService {
  connexion: WebSocket;
  messageRecu = new Subject<Message>();

  constructor() {
    this.connexion = new WebSocket("ws://localhost:8081");

    // Que faire lorsque le serveur nous contacte avec un message
    this.connexion.onmessage = (message: MessageEvent) => {
      const data: Message = JSON.parse(message.data);
      this.messageRecu.next(data);
      console.log(data);
      //console.log(message);
    };
  }

  public send(message: Message) {
    this.connexion.send(JSON.stringify(message));
  }


  
}
