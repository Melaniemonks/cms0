import { EventEmitter, Injectable, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from './contacts.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactSelectedEvent = new EventEmitter<Contact>();
  contactListChangedEvent = new Subject<Contact[]>();
  private contacts: Contact[] = [];
  maxContactId:number;



  constructor(private http:HttpClient) { 
    // this.contacts = MOCKCONTACTS
    // this.maxContactId = this.getMaxId()
  }

  getContacts(): Contact[]{
    this.http.get<Contact[]>('https://angular-4c0e4-default-rtdb.firebaseio.com/contacts.json')
    .subscribe({
      next: (contacts: Contact[]) => {
        this.contacts = contacts;
        this.maxContactId = this.getMaxId();
        this.contacts.sort(function (a, b) {
          if (a.name < b.name) { return -1 }
          else if (a.name > b.name) { return 1 }
          else { return 0 }
        });
        let contactsListClone = this.contacts.slice();
        this.contactListChangedEvent.next(contactsListClone);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
    return this.contacts.slice();
  }
  
  storeContacts(contacts: Contact[]) {
    let getContactList = JSON.stringify(this.contacts);
    let httpHeaders: HttpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');

    this.http.put(
      'https://angular-4c0e4-default-rtdb.firebaseio.com/contacts.json',
      getContactList, { 'headers': httpHeaders })
      .subscribe(() => {
        let contactsListClone = this.contacts.slice();
        this.contactListChangedEvent.next(contactsListClone);
      });
    }
  

  getContact(id:string): Contact{
    for (const contact of this.contacts) {
      if (contact.id === id){
        return contact;
      }  
    };
    return null
  }

  getMaxId(): number {
    let maxId = 0;
    for (let contact of this.contacts) {
      let currentId = parseInt(contact.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addContact(newContact: Contact) {
    if (!newContact) {
      return
    }
    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    let contactsListClone = this.contacts.slice();
    this.storeContacts(contactsListClone);
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }
    let pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    }
    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    let contactsListClone = this.contacts.slice();
    this.storeContacts(contactsListClone);
  }

  deleteContact(contact: Contact) {
    if(!contact) {
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }
    this.contacts.splice(pos, 1);
    let contactsListClone = this.contacts.slice();
    this.storeContacts(contactsListClone);
  }
  }

  

