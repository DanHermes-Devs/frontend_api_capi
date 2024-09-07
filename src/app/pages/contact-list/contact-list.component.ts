import { Component, Input } from '@angular/core';
import { Contact } from '../../interfaces/contact';
import { ContactService } from '../../core/services/contact.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { PaginatedContacts } from '../../interfaces/PaginatedContacts';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})

export class ContactListComponent {
  public contactResults$!: Observable<PaginatedContacts>;

  constructor(private service: ContactService) {}

  ngOnInit(): void {
    this.contactResults$ = this.service.getContactList()
  }

  loadPage(url: string): void {
    this.contactResults$ = this.service.getContactsByUrl(url);
  }
}
