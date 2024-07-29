import { Injectable } from '@angular/core';
import { Contact } from '../models/contact';
import { UtilisateurService } from './utilisateurs.services.ts.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contacts: Contact[] = [];
  private deletedContacts: Contact[] = [];
  private localStorageKey = 'contacts';
  private localStorageDeletedKey = 'deletedContacts';

  constructor(private utilisateurService: UtilisateurService) {
    if (this.isLocalStorageAvailable()) {
      this.loadContactsFromLocalStorage();
      this.loadDeletedContactsFromLocalStorage();
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

  private loadContactsFromLocalStorage(): void {
    const storedContacts = localStorage.getItem(this.localStorageKey);
    if (storedContacts) {
      this.contacts = JSON.parse(storedContacts);
    }
  }

  private loadDeletedContactsFromLocalStorage(): void {
    const storedDeletedContacts = localStorage.getItem(this.localStorageDeletedKey);
    if (storedDeletedContacts) {
      this.deletedContacts = JSON.parse(storedDeletedContacts);
    }
  }

  private saveContactsToLocalStorage(): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(this.localStorageKey, JSON.stringify(this.contacts));
    }
  }

  private saveDeletedContactsToLocalStorage(): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(this.localStorageDeletedKey, JSON.stringify(this.deletedContacts));
    }
  }

  addContact(contact: Contact): void {
    const currentUser = this.utilisateurService.getCurrentUser();
    if (currentUser) {
      contact.userId = currentUser.email; 
      this.contacts.push(contact);
      this.saveContactsToLocalStorage();
    } else {
      alert('Veuillez vous connecter pour ajouter un contact.');
    }
  }

  getContacts(): Contact[] {
    const currentUser = this.utilisateurService.getCurrentUser();
    if (currentUser) {
      return this.contacts.filter(contact => contact.userId === currentUser.email);
    }
    return [];
  }

  deleteContact(email: string): void {
    const contactToDelete = this.contacts.find(contact => contact.email === email);
    if (contactToDelete) {
      this.contacts = this.contacts.filter(contact => contact.email !== email);
      this.deletedContacts.push(contactToDelete);
      this.saveContactsToLocalStorage();
      this.saveDeletedContactsToLocalStorage();
    }
  }

  getDeletedContacts(): Contact[] {
    const currentUser = this.utilisateurService.getCurrentUser();
    if (currentUser) {
      return this.deletedContacts.filter(contact => contact.userId === currentUser.email);
    }
    return [];
  }

  restoreContact(email: string): void {
    const contactToRestore = this.deletedContacts.find(contact => contact.email === email);
    if (contactToRestore) {
      this.deletedContacts = this.deletedContacts.filter(contact => contact.email !== email);
      this.contacts.push(contactToRestore);
      this.saveContactsToLocalStorage();
      this.saveDeletedContactsToLocalStorage();
    }
  }

  updateContact(updatedContact: Contact): void {
    const index = this.contacts.findIndex(contact => contact.email === updatedContact.email);
    if (index !== -1) {
      this.contacts[index] = updatedContact;
      this.saveContactsToLocalStorage();
    }
  }
}
