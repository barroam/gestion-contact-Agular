import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactService } from '../services/contact.service';
import { Contact } from '../models/contact';
import { AddContactComponent } from '../add-contact/add-contact.component';
import { RouterLink } from '@angular/router';
import { UtilisateurService } from '../services/utilisateurs.services.ts.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, AddContactComponent, RouterLink],
  templateUrl: './list-contact.component.html',
  styleUrls: ['./list-contact.component.css']
})
export class ListContactComponent implements OnInit {
  contacts: Contact[] = [];
  deletedContacts: Contact[] = [];
  filteredContacts: Contact[] = [];
  searchTerm: string = '';
  editingContact: Contact | null = null;
  showAddContact: boolean = false;
  showDeletedContacts: boolean = false;

  constructor(private contactService: ContactService, private utilisateurService: UtilisateurService, private router: Router) {}

  ngOnInit(): void {
    this.contacts = this.contactService.getContacts();
    this.filterContacts();
    this.deletedContacts = this.contactService.getDeletedContacts();
  }

  deleteContact(email: string): void {
    this.contactService.deleteContact(email);
    this.contacts = this.contactService.getContacts();
    this.filterContacts();
    this.deletedContacts = this.contactService.getDeletedContacts();
  }

  restoreContact(email: string): void {
    this.contactService.restoreContact(email);
    this.contacts = this.contactService.getContacts();
    this.filterContacts();
    this.deletedContacts = this.contactService.getDeletedContacts();
  }

  startEditing(contact: Contact): void {
    this.editingContact = { ...contact };
  }

  saveContact(): void {
    if (this.editingContact) {
      this.contactService.updateContact(this.editingContact);
      this.contacts = this.contactService.getContacts();
      this.filterContacts();
      this.editingContact = null;
    }
  }

  cancelEdit(): void {
    this.editingContact = null;
  }

  toggleAddContact(): void {
    this.showAddContact = !this.showAddContact;
  }

  onContactAdded(): void {
    this.showAddContact = false;
    this.contacts = this.contactService.getContacts();
    this.filterContacts();
  }

  toggleDeletedContacts(): void {
    this.showDeletedContacts = !this.showDeletedContacts;
  }

  filterContacts(): void {
    this.filteredContacts = this.contacts.filter(contact =>
      contact.nom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  logout(): void {
    this.utilisateurService.logout();
    this.router.navigate(['/login']);
  }
}
