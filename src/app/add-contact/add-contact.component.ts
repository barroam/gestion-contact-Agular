import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../local-storage.service';
@Component({
  selector: 'app-add-contact',
  standalone: true,
  imports: [],
  templateUrl: './add-contact.component.html',
  styleUrl: './add-contact.component.css'
})
export class AddContactComponent {

  constructor(private router: Router, private localStorageService: LocalStorageService) { }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }
  logOut() {
    this.localStorageService.setItem('loggedIn', 'false');
    alert('Logged out successfully');
    this.router.navigate(['/login']);
  }
}
