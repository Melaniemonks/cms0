import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { ContactService } from '../contact.service';

import { Contact } from '../contacts.model';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  contacts: Contact[];


  constructor(private contactService: ContactService) {

  }

  ngOnInit() {
    this.contacts = this.contactService.getContacts();
    this.subscription = this.contactService.contactListChangedEvent
      .subscribe(
        (contactList: Contact[]) => {
          this.contacts = contactList;
        }
      );
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
