import { Component, Injectable, Input, OnInit } from '@angular/core';
import { ContactService } from './contact.service';
import { Contact } from './contacts.model';

@Component({
  selector: 'cms-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  providers: [ContactService]
})
export class ContactsComponent implements OnInit {

selectedContact: Contact;
  constructor(private contactService:ContactService) { }

  ngOnInit(): void {
    this.contactService.contactSelectedEvent
    .subscribe(
      (contact:Contact) => {
        this.selectedContact = contact;
      }
    )
  }

}
