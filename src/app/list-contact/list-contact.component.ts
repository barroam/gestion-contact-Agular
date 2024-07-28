import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactService } from '../services/contact.service';
import { Contact } from '../models/contact';

@Component({
  selector: 'app-list-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './list-contact.component.html',
  styleUrls: ['./list-contact.component.css']
})
export class ListContactComponent implements OnInit {
  contacts: Contact[] = [];
  editingContact: Contact | null = null;

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.contacts = this.contactService.getContacts();
  }
  deleteContact(email: string): void {
    this.contactService.deleteContact(email);
    this.contacts = this.contactService.getContacts();
  }
  startEditing(contact: Contact): void {
    this.editingContact = { ...contact };
  }

  saveContact(): void {
    if (this.editingContact) {
      this.contactService.updateContact(this.editingContact);
      this.contacts = this.contactService.getContacts();
      this.editingContact = null;
    }
  }

  cancelEdit(): void {
    this.editingContact = null;
  }
}
