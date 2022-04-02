import { EventEmitter, Injectable } from '@angular/core';
import { Document } from './document.model';
import {MOCKDOCUMENTS} from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  documentSelectedEvent = new EventEmitter<Document>();
  documentListChangedEvent = new Subject<Document[]>();
  maxDocumentId:number;
  private documents: Document[] = [];

  constructor(private http: HttpClient) {
    // this.documents = MOCKDOCUMENTS;
    // this.maxDocumentId = this.getMaxId();
   }

  //gets the document array from Mockdocs and saves it to a new array
  getDocuments(): Document[]{
    this.http.get<Document[]>('https://angular-4c0e4-default-rtdb.firebaseio.com/documents.json')
    .subscribe({
      next: (documents: Document[]) => {
        this.documents = documents;
        this.maxDocumentId = this.getMaxId();
        this.documents.sort(function (a, b) {
          if (a.name < b.name) { return -1 }
          else if (a.name > b.name) { return 1 }
          else { return 0 }
        });
        let documentsListClone = this.documents.slice();
        this.documentListChangedEvent.next(documentsListClone);
      },

      error: (error: any) => {
        console.log(error);
      }
    });
    return this.documents.slice();
  }

  storeDocuments(documents: Document[]) {
    let getDocumentList = JSON.stringify(documents);
    let httpHeaders: HttpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');

    this.http.put(
      'https://angular-4c0e4-default-rtdb.firebaseio.com/documents.json',
      getDocumentList, { 'headers': httpHeaders })
      .subscribe(() => {
        let documentsListClone = this.documents.slice();
        this.documentListChangedEvent.next(documentsListClone);
      });
    }

  getDocument(id: string): Document {
    for (let document of this.documents) {
      if (document.id === id) {
        return document;
      }
    }
    return null;
  }


 getMaxId(): number {

  let maxId = 0

  for (let document of this.documents) {
    let currentId = parseInt(document.id);
    if (currentId > maxId){
      maxId = currentId;
    }
  }

  return maxId
}

addDocument(newDocument: Document) {
  if (!newDocument) {
    return
  }
  this.maxDocumentId++;
  newDocument.id = this.maxDocumentId.toString();
  this.documents.push(newDocument);
  let documentsListClone = this.documents.slice();
  this.storeDocuments(documentsListClone);
}

updateDocument(originalDocument: Document, newDocument: Document) {
  if (!originalDocument || !newDocument) {
    return;
  }
  let pos = this.documents.indexOf(originalDocument);
  if (pos < 0) {
    return;
  }
  newDocument.id = originalDocument.id;
  this.documents[pos] = newDocument;
  let documentsListClone = this.documents.slice();
  this.storeDocuments(documentsListClone);
}

deleteDocument(document: Document) {
  if (!document) {
     return;
  }
  const pos = this.documents.indexOf(document);
  if (pos < 0) {
     return;
  }
  this.documents.splice(pos, 1);
  let documentsListClone = this.documents.slice();
  this.storeDocuments(documentsListClone);
}


}