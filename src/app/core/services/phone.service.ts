import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Phone } from '../../interfaces/phone';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PhoneService {

  apiurl = environment.api_url;

  constructor(private http: HttpClient) { }

  getPhoneContactById(id: number): Observable<Phone> {
    return this.http.get<Phone>(this.apiurl + "/phone/" + id);
  }

  createPhoneContact(phone: Phone): Observable<Phone> {
    return this.http.post<Phone>(this.apiurl + "/phone", phone);
  }

  updatePhoneContact(phone: Phone): Observable<Phone> {
    return this.http.put<Phone>(this.apiurl + "/phone/" + phone.id, phone);
  }

  deletePhoneContact(id: number): Observable<Phone> {
    return this.http.delete<Phone>(this.apiurl + "/phone/" + id);
  }
}
