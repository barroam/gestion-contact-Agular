import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UtilisateurService } from './services/utilisateurs.services.ts.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private utilisateurService: UtilisateurService, private router: Router) {}

  canActivate: CanActivateFn = (): boolean => {
    if (this.utilisateurService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
