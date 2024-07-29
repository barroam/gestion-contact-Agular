// src/app/login/login.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilisateurService } from '../services/utilisateurs.services.ts.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private utilisateurService: UtilisateurService, private router: Router) {}

  onLogin() {
    if (this.email && this.password) {
      const success = this.utilisateurService.login(this.email, this.password);
      if (success) {
        alert('Connexion réussie !');
        this.router.navigate(['/']); // Rediriger vers la liste des contacts
      } else {
        alert('Identifiants incorrects.');
      }
    } else {
      alert('Veuillez remplir tous les champs.');
    }
  }
}
