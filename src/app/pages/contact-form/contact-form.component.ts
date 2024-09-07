import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../core/services/contact.service';
import { Contact } from '../../interfaces/contact';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})

export class ContactFormComponent implements OnInit {
  contact: Contact = {
    id: 0,
    name: '',
    notes: '',
    birthday: '',
    website: '',
    company: '',
    created_at: '',
    updated_at: '',
    addresses: [],
    emails: [],
    phones: []
  };
  isEditMode: boolean = false;
  contactId!: number;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.contactId = this.route.snapshot.params['id']; // Obtener el ID del contacto si es edición
    if (this.contactId) {
      this.isEditMode = true;
      this.loadContactData();
    }
  }

  loadContactData(): void {
    this.contactService.getContactById(this.contactId).subscribe(contact => {
      this.contact = contact;
    });
  }

  saveContact(): void {
    if (this.isEditMode) {
      this.contactService.updateContact(this.contact).subscribe(() => {
        this.router.navigate(['/contacts']);
      });
    } else {
      this.contactService.createContact(this.contact).subscribe(() => {
        this.router.navigate(['/contacts']);
      });
    }
  }
}
