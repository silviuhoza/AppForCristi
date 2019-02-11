import { Component, OnInit } from '@angular/core';
import { Contact } from "../../models/Contact";
import { ContactServicesService } from "../../services/contact-services.service";

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  contacts: Contact[];
  constructor(
    private contactService: ContactServicesService
  ) { }

  ngOnInit() {
  this.contactService.getContacts().subscribe(contacts => {
    this.contacts = contacts;
    console.log(this.contacts);
  });
   
  }

}
