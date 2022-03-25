import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ContactService } from '../contact.service';
import { Contact } from '../contacts.model';

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  originalContact: Contact;
  contact: Contact;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  id: string;

  constructor(private contactService: ContactService,
        private router: Router,
        private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.params
    .subscribe((params: Params) => {
      this.id = params['id'];
      if(!this.id){
        this.editMode = false;
        return;
      }
      this.originalContact = this.contactService.getContact(this.id);
      if(!this.originalContact){
        return;
      }
      this.editMode = true;
      this.contact = JSON.parse(JSON.stringify(this.originalContact));

      if(this.contact.group && this.contact.group.length > 0) {
        this.groupContacts = JSON.parse(JSON.stringify(this.originalContact.group));
      }
    })
  }

  onSubmit(form:NgForm){
    let value = form.value;
    let newContact = new Contact(
      value.id,
      value.name,
      value.email,
      value.phone,
      value.imageUrl,
      []);

      if(this.editMode){
        this.contactService.updateContact(this.originalContact, newContact);
      }else{
        this.contactService.addContact(newContact);
      }
      this.router.navigate(['/contacts']);

  }

  onCancel(){
    this.router.navigate(['/contacts']);
  }

  onRemoveItem(i){

  }
  
 }


