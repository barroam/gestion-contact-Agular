import { Component  , OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importez FormsModule
import { Router } from '@angular/router';
import { LocalStorageService } from '../local-storage.service';
@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent implements OnInit{
  signupObjet = {
    username: '',
    email: '',
    password: ''
  };

  loginObjet = {
    email: '',
    password: ''
  };

  constructor(private localStorageService: LocalStorageService, private router: Router) { } // Ajoutez Router

  ngOnInit(): void { }

  signUp() {
    const { username, email, password } = this.signupObjet;
    if (username && email && password) {
      this.localStorageService.setItem('user', JSON.stringify({ username, email, password }));
      alert('Sign up successful!');
      this.signupObjet = { username: '', email: '', password: '' }; // Clear form
    } else {
      alert('Please fill all fields');
    }
  }

  /*logIn() {
    const { email, password } = this.loginObjet;
    const storedUser = this.localStorageService.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.email === email && user.password === password) {
        alert('Login successful!');
        this.router.navigate(['/list-contact']);
      } else {
        alert('Invalid credentials');
      }
    } else {
      alert('No user found. Please sign up.');
    }
  }*/
    logIn() {
      const { email, password } = this.loginObjet;
      const storedUser = this.localStorageService.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user.email === email && user.password === password) {
          alert('Login successful!');
          this.localStorageService.setItem('loggedIn', 'true');
          this.router.navigate(['/list-contact']);
        } else {
          alert('Invalid credentials');
        }
      } else {
        alert('No user found. Please sign up.');
      }
    }
}
