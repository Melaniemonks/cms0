import { Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';

import { Document } from '../document.model';
import { DocumentsService } from '../documents.service';

@Component({
  selector: 'cms-document-list',
  templateUrl:'./document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  documents: Document[] = [];
  
  constructor(private documentService: DocumentsService) { 
    
  }

  ngOnInit(): void {
    this.documents = this.documentService.getDocuments();
    this.subscription = this.documentService.documentListChangedEvent
    .subscribe(
      (documentList: Document[]) => {
        this.documents = documentList;
      });

  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
  
 

}
