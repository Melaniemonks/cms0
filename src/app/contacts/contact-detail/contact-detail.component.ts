import { Component, Input, OnInit } from '@angular/core';
import { DetachedRouteHandle } from '@angular/router';
import { Contact } from '../contacts.model';

@Component({
  selector: 'cms-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  @Input() contact: Contact;
 
  constructor() { }

  ngOnInit(): void {
  }

 

}
