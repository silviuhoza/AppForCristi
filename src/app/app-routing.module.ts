import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { ContactAddComponent } from "./components/contact-add/contact-add.component";
import { ContactDetailsComponent } from "./components/contact-details/contact-details.component";
import { ContactEditComponent } from "./components/contact-edit/contact-edit.component";
import { ContactsComponent } from "./components/contacts/contacts.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
 import { NotFoundComponent } from "./components/not-found/not-found.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '', component: ContactsComponent},
  {path: 'contact/add', component: ContactAddComponent},
  {path: 'contact/edit/:id', component: ContactEditComponent},
  {path: 'contact/:id', component: ContactDetailsComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
