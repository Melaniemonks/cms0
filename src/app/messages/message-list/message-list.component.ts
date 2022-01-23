import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {


messages: Message[] = [
  new Message(1, 'Maths', 'This is maths', 'Melanie'),
  new Message(2, 'ENG', 'This is ENG', 'Harold'),
  new Message(3, 'COMP', 'This is COMP', 'Russell'),
]
  constructor() { }

  ngOnInit(): void {
  }

  onAddMessage(message: Message){
    this.messages.push(message);
  }

}
