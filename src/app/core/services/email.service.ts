import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Email } from '../../interfaces/email';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) { }

  getEmailContactById(id: number): Observable<Email> {
    return this.http.get<Email>(`http://api_rest_capi.test/api/email/${id}`);
  }

  createEmailContact(email: Email): Observable<Email> {
    return this.http.post<Email>(`http://api_rest_capi.test/api/email`, email);
  }

  updateEmailContact(email: Email): Observable<Email> {
    return this.http.put<Email>(`http://api_rest_capi.test/api/email/${email.id}`, email);
  }

  deleteEmailContact(id: number): Observable<Email> {
    return this.http.delete<Email>(`http://api_rest_capi.test/api/email/${id}`);
  }
}
