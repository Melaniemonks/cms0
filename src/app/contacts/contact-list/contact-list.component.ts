import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ContactService } from '../contact.service';

import { Contact } from '../contacts.model';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  
 contacts: Contact[];


  constructor(private contactService: ContactService) { 

  }

  ngOnInit() {
    this.contacts = this.contactService.getContacts();
  }

  onContactSelected(contact:Contact){
    this.contactService.contactSelectedEvent.emit(contact);
  }


}
