import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactService } from '../services/contact.service';
import { Contact } from '../models/contact';

@Component({
  selector: 'app-list-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-contact.component.html',
  styleUrls: ['./list-contact.component.css']
})
export class ListContactComponent implements OnInit {
  contacts: Contact[] = [];

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.contacts = this.contactService.getContacts();
  }
  deleteContact(email: string): void {
    this.contactService.deleteContact(email);
    this.contacts = this.contactService.getContacts();
  }
}
