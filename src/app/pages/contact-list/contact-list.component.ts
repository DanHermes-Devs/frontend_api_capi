import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importar FormsModule
import { CommonModule } from '@angular/common';
import { ContactService } from '../../core/services/contact.service';
import { Observable, Subject } from 'rxjs';
import { PaginatedContacts } from '../../interfaces/PaginatedContacts';
import { debounceTime } from 'rxjs/operators';
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
  public searchTerm: string = '';
  isLoading: boolean = false;

  constructor(
    private service: ContactService,
    private router: Router,
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
