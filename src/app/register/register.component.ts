import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilisateurService } from '../services/utilisateurs.services.ts.service';
import { Utilisateur } from '../models/utilisateur';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  telephone: string = '';
  email: string = '';
  password: string = '';

  constructor(private utilisateurService: UtilisateurService, private router: Router) {}

  onRegister() {
    if (this.telephone && this.email && this.password) {
      const newUtilisateur = new Utilisateur(this.telephone, this.email, this.password);
      this.utilisateurService.addUtilisateur(newUtilisateur);
      alert('Inscription réussie !');
      this.router.navigate(['/login']); // Rediriger vers la page de connexion après l'inscriptio
    } else {
      alert('Veuillez remplir tous les champs.');
    }
  }
}
