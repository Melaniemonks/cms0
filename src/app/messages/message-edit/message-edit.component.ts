import { ThisReceiver } from '@angular/compiler';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Message } from '../message.model';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
@ViewChild('msgText') msgTextRef: ElementRef;
@ViewChild('subject') subjectRef: ElementRef;

@Output() addMessageEvent = new EventEmitter<Message>();
currentSender:string = 'Melanie';

  constructor(private messageService: MessagesService) { }

  ngOnInit(): void {
  }

  onSendMessage(){
    let subject = this.subjectRef.nativeElement.value;
    let msgText = this.msgTextRef.nativeElement.value;
    let message = new Message('0', subject, msgText, this.currentSender);

    this.messageService.addMessage(message);

  }

  onClear(){
    this.subjectRef.nativeElement.value = " ";
    this.msgTextRef.nativeElement.value = ' ';
  }

}
