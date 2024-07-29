import { Routes } from '@angular/router';
import { UserLoginComponent } from './user-login/user-login.component';
import { AddContactComponent } from './add-contact/add-contact.component';
import { ListContactComponent } from './list-contact/list-contact.component';

export const routes: Routes = [
{path:'login',component:UserLoginComponent},
{path:'add-contact',component:AddContactComponent},
{path:'list-contact', component:ListContactComponent},
 { path:'', redirectTo: 'login', pathMatch: 'full' }
];
