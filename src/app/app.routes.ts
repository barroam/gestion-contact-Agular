import { Routes } from '@angular/router';
import { ListContactComponent } from './list-contact/list-contact.component';
import { AddContactComponent } from './add-contact/add-contact.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', component: ListContactComponent, canActivate: [AuthGuard] },
  { path: 'addcontact', component: AddContactComponent, canActivate: [AuthGuard] },
  {path: 'login', component:LoginComponent},
  {path: 'inscription', component:RegisterComponent}
];

