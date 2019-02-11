import { Component, OnInit } from '@angular/core';
import { Contact } from '../../models/Contact';
import { ContactServicesService } from "../../services/contact-services.service";
import { Router, ActivatedRoute } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {

  id: string;
  contact : Contact ={
    firstName:'',
    lastName: '',
    email: '',
    phoneNumber: ''
  }
  constructor(
    private contactService: ContactServicesService,
    private router: Router,
    private route: ActivatedRoute,
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


  onSubmit({value, valid}:{value: Contact, valid: boolean}){
    if (!valid) {
      this.flashMessage.show('Please fill out the form correctly!', {
        cssClass: 'alert-danger', timeout: 4000
      });
    } else {
      //Add id to contact
      value.id = this.id;
      //Update the contact
      this.contactService.updateContact(value);
      //Adding the message
      this.flashMessage.show('Contact updated successfully!', {
        cssClass: 'alert-success', timeout: 4000
      });
      
      // this.router.navigate(['/contact/'+this.id]);
      this.router.navigate([`/contact/${this.id}`]);
    }
  }

}
