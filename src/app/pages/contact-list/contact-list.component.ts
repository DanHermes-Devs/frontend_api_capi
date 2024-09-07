import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importar FormsModule
import { CommonModule } from '@angular/common';
import { ContactService } from '../../core/services/contact.service';
import { Observable, Subject } from 'rxjs';
import { PaginatedContacts } from '../../interfaces/PaginatedContacts';
import { debounceTime } from 'rxjs/operators';
import { Contact } from '../../interfaces/contact';
import { Address } from '../../interfaces/address';
import { Email } from '../../interfaces/email';
import { Phone } from '../../interfaces/phone';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent {
  public contactResults$!: Observable<PaginatedContacts>;
  isLoading: boolean = false;

  constructor(
    private service: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.contactResults$ = this.service.getContactList();
  }

  search(term: string): void {
    if (term.trim() === '') {
      this.contactResults$ = this.service.getContactList();
    } else {
      this.isLoading = true;
      this.contactResults$ = this.service.getContactBySearch(term);
      this.isLoading = false;
    }
  }

  onInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement | null;
    if (inputElement) {
      this.search(inputElement.value);
    }
  }

  loadPage(url: string): void {
    this.contactResults$ = this.service.getContactsByUrl(url);
  }

  deleteContact(id: number): void {
    if (confirm('Are you sure you want to delete this contact?')) {
      this.service.deleteContact(id).subscribe(() => {
        this.contactResults$ = this.service.getContactList();
      });
    }
  }

  editContact(id: number): void {
    this.router.navigate(['/contacts/edit', id]);
  }

  createContact(): void {
    this.router.navigate(['/contacts/create']);
  }
}
