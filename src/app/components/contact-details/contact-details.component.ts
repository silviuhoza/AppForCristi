import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/Contact';
import { ContactServicesService } from "../../services/contact-services.service";
import { Router, ActivatedRoute } from "@angular/router";
import {FlashMessagesService  } from "angular2-flash-messages";


@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {
  contacts : Contact[];
  contact: Contact;
  id: string;
  

  constructor(
    private contactService: ContactServicesService,
    private router : Router,
    private route : ActivatedRoute,
    private flashMessage: FlashMessagesService
    ) { }

  ngOnInit() {
        //Get the id for contact
        this.id = this.route.snapshot.params['id'];
      console.log(this.id);
      //Get Contact
      this.contactService.getContact(this.id).subscribe(contact => {
          console.log(contact);
          this.contact = contact;
      });
  
  
  }

  onDeleteClick() {
    if (confirm('Are you sure?')) {
      this.contactService.deleteContact(this.contact);
      //Adding the message
      this.flashMessage.show("Contact removed!", {
        cssClass: "alert-success",
        timeout: 4000
      });
      //Navigate back to the dashboard
      this.router.navigate(['/']);
    }
  }

  
}
