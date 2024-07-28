import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactService } from '../services/contact.service';
import { Contact } from '../models/contact';
@Component({
  selector: 'app-add-contact',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor],
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent {
  nom: string = '';
  email: string = '';
  telephone: string = '';

  constructor(private contactService: ContactService) {}

  onAddContact() {
    if (this.nom && this.email && this.telephone) {
      const newContact = new Contact(this.nom, this.email, this.telephone);
      this.contactService.addContact(newContact);
      this.clearForm();
      alert('Contact enregistré avec succès!');
    } else {
      alert('Veuillez remplir tous les champs.');
    }
  }

  clearForm() {
    this.nom = '';
    this.email = '';
    this.telephone = '';
  }
}
