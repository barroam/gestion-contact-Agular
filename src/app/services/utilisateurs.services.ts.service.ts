import { Injectable } from '@angular/core';
import { Utilisateur } from '../models/utilisateur';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  private utilisateurs: Utilisateur[] = [];
  private localStorageKey = 'utilisateurs';
  private currentUserKey = 'currentUser';

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

  private saveCurrentUserToLocalStorage(utilisateur: Utilisateur): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(this.currentUserKey, JSON.stringify(utilisateur));
    }
  }

  private getCurrentUserFromLocalStorage(): Utilisateur | null {
    if (this.isLocalStorageAvailable()) {
      const storedCurrentUser = localStorage.getItem(this.currentUserKey);
      if (storedCurrentUser) {
        return JSON.parse(storedCurrentUser);
      }
    }
    return null;
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
      this.saveCurrentUserToLocalStorage(utilisateur);
      return true;
    }
    return false;
  }

  getCurrentUser(): Utilisateur | null {
    return this.getCurrentUserFromLocalStorage();
  }

  logout(): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem(this.currentUserKey);
    }
  }
}
