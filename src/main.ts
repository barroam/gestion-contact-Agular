import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { UserLoginComponent } from './app/user-login/user-login.component';
import { AddContactComponent } from './app/add-contact/add-contact.component';
import { Route,provideRouter} from '@angular/router';


// Définir les routes
const routes: Route[] = [
  { path: 'list-contact', component: UserLoginComponent },
  { path: 'add-contact', component: AddContactComponent },
 /* { path: '', redirectTo: '/add-contact', pathMatch: 'full' }*/
  { path:'', redirectTo: '/list-contact', pathMatch: 'full' }
];

// Bootstrap de l'application
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes)
  ]
}).catch(err => console.error(err));
