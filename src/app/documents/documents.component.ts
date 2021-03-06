import { Component, OnInit } from '@angular/core';
import { Document } from './document.model';
import { DocumentsService } from './documents.service';

@Component({
  selector: 'cms-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css'],
  providers: [DocumentsService]
})
export class DocumentsComponent implements OnInit {
selectedDocument : Document;
  constructor(private documentService: DocumentsService) { }

  ngOnInit(): void {
    this.documentService.documentSelectedEvent
    .subscribe(
      (contact:Document) => {
        this.selectedDocument = contact;
      }
    )
  }

}
