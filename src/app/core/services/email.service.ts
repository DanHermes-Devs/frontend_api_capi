import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Email } from '../../interfaces/email';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  apiurl = environment.api_url;

  constructor(private http: HttpClient) { }

  getEmailContactById(id: number): Observable<Email> {
    return this.http.get<Email>(this.apiurl + "/email/" + id);
  }

  createEmailContact(email: Email): Observable<Email> {
    return this.http.post<Email>(this.apiurl + "/email", email);
  }

  updateEmailContact(email: Email): Observable<Email> {
    return this.http.put<Email>(this.apiurl + "/email/" + email.id, email);
  }

  deleteEmailContact(id: number): Observable<Email> {
    return this.http.delete<Email>(this.apiurl + "/email/" + id);
  }
}
