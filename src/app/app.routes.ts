import { Routes } from '@angular/router';
import { ListContactComponent } from './list-contact/list-contact.component';
import { AddContactComponent } from './add-contact/add-contact.component';

export const routes: Routes = [
  {path: '', component:ListContactComponent},
  {path: 'addcontact', component:AddContactComponent}
];
