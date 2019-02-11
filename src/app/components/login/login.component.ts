import { Component, OnInit, ViewChild } from '@angular/core'; 

import { Router} from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";
import { User } from "../../models/User";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  @ViewChild('contactForm') form: any;
  constructor(
    private flashMessage: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {

  }

  onSubmit({value, valid}: {value: User, valid: boolean}){
    //Check to see if the form is fill up coerrctly
    console.log(value, valid);
    
    if (!valid) {
      this.flashMessage.show('Please fill out the form correctly!', {
        cssClass: 'alert-danger', timeout: 4000
      });
      // alert('your form is not valid')
      } else {
        this.flashMessage.show('Your are logged in!', {
          cssClass: 'alert-success', timeout: 4000
        });
        this.router.navigate(['/'])
      }
    }
  
    
    
    
  }

