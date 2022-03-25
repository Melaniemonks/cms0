import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Document } from '../document.model';
import { DocumentsService } from '../documents.service';

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {
originalDocument: Document;
document: Document
id?:string;
editMode: boolean = false;
  constructor(private route:ActivatedRoute,
    private documentService: DocumentsService,
    private router:Router
    ) { }

  ngOnInit(): void {
    // this.route.params
    //   .subscribe(
    //     (params: Params) => {
    //       this.id = params['id'];
    //       this.editMode = params['id'] != null;
    //     }
    //   );
    this.route.params
    .subscribe((params: Params) => {
    this.id = params['id'];
    if(!this.id){
      this.editMode = false;
      return;
    }
    this.originalDocument = this.documentService.getDocument(this.id);

    if(!this.originalDocument){
      return;
    }
    this.editMode = true;
    this.document = JSON.parse(JSON.stringify(this.originalDocument));
  })

  }

  onSubmit(form:NgForm){
    let value = form.value;
    let newDocument = new Document(
      value.id, 
      value.name, 
      value.description, 
      value.url, 
      []);

    if(this.editMode){
      this.documentService.updateDocument(this.originalDocument, newDocument);
    }else{
      this.documentService.addDocument(newDocument);
    }
    this.router.navigate(['/documents']);
  }

  onCancel(){
    this.router.navigate(['/documents'])
  }
}
