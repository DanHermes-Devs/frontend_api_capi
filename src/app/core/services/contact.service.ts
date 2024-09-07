import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from '../../interfaces/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  getContactList(): Observable<Contact> {
    return this.http.get<Contact>(`http://api_rest_capi.test/api/contacts`);
  }

  getContactById(id: number): Observable<Contact> {
    return this.http.get<Contact>(`http://api_rest_capi.test/api/contact/${id}`);
  }

  getContactBySearch(search: string): Observable<Contact> {
    return this.http.get<Contact>(`http://api_rest_capi.test/api/contact/filter?term=${search}&per_page=10`);
  }

  createContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(`http://api_rest_capi.test/api/contacts`, contact);
  }

  updateContact(contact: Contact): Observable<Contact> {
    return this.http.put<Contact>(`http://api_rest_capi.test/api/contact/${contact.id}`, contact);
  }

  deleteContact(id: number): Observable<Contact> {
    return this.http.delete<Contact>(`http://api_rest_capi.test/api/contact/${id}`);
  }
}
