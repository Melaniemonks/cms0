// This ts file imports contacts.model where the contact object was created initially. howeverm there are no 
// no values because they were just declared and no parameters passed. This will show no items
// To see how the items were show go back to contacts list

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Contact } from '../../contacts.model'; 

@Component({
  selector: 'cms-contact-item',
  templateUrl: 'contact-item.component.html',
  styleUrls: ['contact-item.component.css']
})
export class ContactItemComponent implements OnInit {
   @Input() contact: Contact;
   @Input() id: string;

  // //Used when contact is selected
  @Output() contactSelected = new EventEmitter<void>();
  
  
  
  constructor() { 

  }

  ngOnInit(): void {
  }

  // Used for on selection of contact

   onSelected(){
     this.contactSelected.emit();
   }

}
