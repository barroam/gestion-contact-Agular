import { Routes } from '@angular/router';
import { ListContactComponent } from './list-contact/list-contact.component';
import { AddContactComponent } from './add-contact/add-contact.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
  {path: '', component:ListContactComponent},
  {path: 'addcontact', component:AddContactComponent},
  {path: 'login', component:LoginComponent},
  {path: 'inscription', component:RegisterComponent}
];

