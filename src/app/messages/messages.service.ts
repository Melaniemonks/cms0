import { EventEmitter, Injectable } from '@angular/core';
import { Message } from './message.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  messagesChanged = new EventEmitter<Message[]>();
  maxMessageId: number;
  private messages: Message[] = [];


  constructor(private http: HttpClient) { 
    // this.messages = MOCKMESSAGES;
  }

  getMessages(): Message[]{
    this.http.get<Message[]>('https://angular-4c0e4-default-rtdb.firebaseio.com/messages.json')
    .subscribe({
      next: (messages: Message[]) => {
        this.messages = messages;
        this.maxMessageId = this.getMaxId();
        this.messages.sort(function (a, b) {
          if (a.sender < b.sender) { return -1 }
          else if (a.sender > b.sender) { return 1 }
          else { return 0 }
        });
        let messagesListClone = this.messages.slice();
        this.messagesChanged.next(messagesListClone);
      },

      error: (error: any) => {
        console.log(error);
      }
    });
    return this.messages.slice()
  }

  storeMessages(messages: Message[]) {
    let getMessageList = JSON.stringify(this.messages);
    let httpHeaders: HttpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');

    this.http.put(
      'https://angular-4c0e4-default-rtdb.firebaseio.com/messages.json',
      getMessageList, { 'headers': httpHeaders })
      .subscribe(() => {
        let messageListClone = this.messages.slice();
        this.messagesChanged.next(messageListClone);
      });
  }



  getMessage(id:string): Message{
    for (const message of this.messages){
      if(message.id === id){
        return message;
      }
    };
    return null;
  }

  addMessage(newMessage: Message){

    if (!newMessage) {
      return
    }
    this.maxMessageId++;
    newMessage.id = this.maxMessageId.toString();

    this.messages.push(newMessage);
    let messageListClone = this.messages.slice();
    this.storeMessages(messageListClone);
    
  }

  getMaxId(): number {
    let maxId = 0;
    for (let message of this.messages) {
      let currentId = parseInt(message.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

}
