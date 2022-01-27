import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl:'./document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

documents: Document[] = [
  new Document(1, 'CIT 260 - Object Oriented Programming', 'This is my first document', 'www.you.com', null),
  new Document(2, 'CIT 366 - Full Web Stack Development', 'I am 10years old and TV is my life', 'www.you.com', null),
  new Document(3, 'CIT 425 - Warehousing', 'Watermelon sugar high', 'www.you.com', null)
];
  constructor() { }

  ngOnInit(): void {
  }

  onSelectedDocument(document:Document){
    this.selectedDocumentEvent.emit(document);
  }

}
