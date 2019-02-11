import { Component, OnInit, ViewChild } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { ContactServicesService } from "../../services/contact-services.service";
import { Contact } from "../../models/Contact";


@Component({
  selector: 'app-contact-add',
  templateUrl: './contact-add.component.html',
  styleUrls: ['./contact-add.component.css']
})
export class ContactAddComponent implements OnInit {
  contact: Contact = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    id: ''
  }
    

  @ViewChild('contactForm') form: any;

  constructor(
    private contactService: ContactServicesService,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
    
  }

  onSubmit({ value, valid }: { value: Contact, valid: boolean }) {
    console.log(value, valid);
   
    if (!valid) {
      //Show errors
      this.flashMessage.show('Please fill out the form correctly', {
        cssClass: 'alert-danger', timeout: 4000
      });
    } else {
      //Add new client
      this.contactService.newContact(value);
      //Show message
      this.flashMessage.show("New contact added", {
        cssClass: "alert-success",
        timeout: 4000
      });

      //Redirect to dashboard
      this.router.navigate(['/']);
    }
  }

}
