import { Injectable } from '@angular/core';
import { Contact } from '../models/contact';
@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contacts: Contact[] = [];
  private localStorageKey = 'contacts';

  constructor() {
    if (this.isLocalStorageAvailable()) {
      this.loadContactsFromLocalStorage();
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

  private saveContactsToLocalStorage(): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(this.localStorageKey, JSON.stringify(this.contacts));
    }
  }

  addContact(contact: Contact): void {
    this.contacts.push(contact);
    this.saveContactsToLocalStorage();
  }

  getContacts(): Contact[] {
    return this.contacts;
  }
  deleteContact(email: string): void {
    this.contacts = this.contacts.filter(contact => contact.email !== email);
    this.saveContactsToLocalStorage();
  }
}
