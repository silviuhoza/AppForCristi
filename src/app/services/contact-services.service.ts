import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "angularfire2/firestore";

import { Observable } from "rxjs";
import { map } from 'rxjs/operators'
import { Contact } from "../models/Contact";

@Injectable({
  providedIn: 'root'
})
export class ContactServicesService {
  contactsCollection: AngularFirestoreCollection<Contact>;
  contactDoc: AngularFirestoreDocument<Contact>;
  contacts: Observable<Contact[]>;
  contact: Observable<Contact>;
 
  


  constructor( 
    private afs: AngularFirestore
  ) { 
    this.contactsCollection = this.afs.collection("contacts");
    // this.contacts = [
    //   {
    //     id: 1,
    //     firstName: 'Jhon',
    //     lastName: 'Daniels',
    //     phoneNumber: '1234567890',
    //     email: 'jhond@gmail.com'
    //   },
    //   {
    //     id: 2,
    //     firstName: 'Jane',
    //     lastName: 'Smith',
    //     phoneNumber: '1234567890',
    //     email: 'jane@gmail.com'
    //   },
    //   {
    //     id: 3,
    //     firstName: 'Karen',
    //     lastName: 'Smimson',
    //     phoneNumber: '1234567890',
    //     email: 'karen@gmail.com'
    //   }
    // ];
  }


  getContacts(): Observable<Contact[]> {
    // Get contacts with the id
    this.contacts = this.contactsCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as Contact;
          data.id = a.payload.doc.id;
          return data;
        })
      )
    );

    return this.contacts;
  }
 

  newContact(contact: Contact) {
    this.contactsCollection.add(contact);
  }

  getContact(id:string ): Observable<Contact>{
    this.contactDoc = this.afs.doc<Contact>(`contacts/${id}`);
    this.contact = this.contactDoc.snapshotChanges().pipe(
      map(action => {
        if (action.payload.exists === false) {
          return null;
        } else {
          const data = action.payload.data() as Contact;
          data.id = action.payload.id;
          return data;
        }
      }));

    return this.contact;
  }

  updateContact(contact: Contact) {

    this.contactDoc = this.afs.doc(`contacts/${contact.id}`);
    this.contactDoc.update(contact);
  }
  deleteContact(contact: Contact) {

    this.contactDoc = this.afs.doc(`contacts/${contact.id}`);
    this.contactDoc.delete();
  }
  
}
