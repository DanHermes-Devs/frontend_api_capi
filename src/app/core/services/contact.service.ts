import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from '../../interfaces/contact';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  apiurl = environment.api_url;

  constructor(private http: HttpClient) { }

  getContactList(): Observable<Contact> {
    return this.http.get<Contact>(this.apiurl + "/contacts");
  }

  getContactById(id: number): Observable<Contact> {
    return this.http.get<Contact>(this.apiurl + "/contact/" + id);
  }

  getContactBySearch(search: string): Observable<Contact> {
    return this.http.get<Contact>(this.apiurl + "/contact/filter?term=" + search + "&per_page=10");
  }

  createContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.apiurl + "/contacts", contact);
  }

  updateContact(contact: Contact): Observable<Contact> {
    return this.http.put<Contact>(this.apiurl + "/contact/" + contact.id, contact);
  }

  deleteContact(id: number): Observable<Contact> {
    return this.http.delete<Contact>(this.apiurl + "/contact/" + id);
  }
}
