import { Injectable } from '@angular/core';
import { Utilisateur } from '../models/utilisateur';
@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  private utilisateurs: Utilisateur[] = [];
  private localStorageKey = 'utilisateurs';
  private isLoggedInKey = 'isLoggedIn';

  constructor() {
    if (this.isLocalStorageAvailable()) {
      this.loadUtilisateursFromLocalStorage();
    }
  }

  private isLocalStorageAvailable(): boolean {
    try {
      const test = '__localStorage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  private loadUtilisateursFromLocalStorage(): void {
    if (this.isLocalStorageAvailable()) {
      const storedUtilisateurs = localStorage.getItem(this.localStorageKey);
      if (storedUtilisateurs) {
        this.utilisateurs = JSON.parse(storedUtilisateurs);
      }
    }
  }

  private saveUtilisateursToLocalStorage(): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(this.localStorageKey, JSON.stringify(this.utilisateurs));
    }
  }

  addUtilisateur(utilisateur: Utilisateur): void {
    this.utilisateurs.push(utilisateur);
    this.saveUtilisateursToLocalStorage();
  }

  getUtilisateurs(): Utilisateur[] {
    return this.utilisateurs;
  }

  login(email: string, password: string): boolean {
    const utilisateur = this.utilisateurs.find(u => u.email === email && u.password === password);
    if (utilisateur) {
      localStorage.setItem(this.isLoggedInKey, 'true');
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.setItem(this.isLoggedInKey, 'false');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem(this.isLoggedInKey) === 'true';
  }

}
