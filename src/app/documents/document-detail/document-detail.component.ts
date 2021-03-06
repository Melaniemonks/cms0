import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WindRefService } from 'src/app/wind-ref.service';
import { Document } from '../document.model';
import { DocumentsService } from '../documents.service';

@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {
 document:Document;
 id: string;
 nativeWindow:any;
 
  constructor(private route:ActivatedRoute,
    private documentService: DocumentsService,
    private windRefService: WindRefService,
    private router:Router
              ) { }

  ngOnInit() 
  {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.document = this.documentService.getDocument(this.id);
      }
    )
    this.nativeWindow = this.windRefService.getNativeWindow()
  }

  onView(){
    if(this.document.url) {
      this.nativeWindow.open(this.document.url);
    }
  }

  onDelete() {
    this.documentService.deleteDocument(this.document);
    this.router.navigate(['/documents']);
 }
  



}
