import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Phone } from '../../interfaces/phone';

@Injectable({
  providedIn: 'root'
})
export class PhoneService {

  constructor(private http: HttpClient) { }

  getPhoneContactById(id: number): Observable<Phone> {
    return this.http.get<Phone>(`http://api_rest_capi.test/api/phone/${id}`);
  }

  createPhoneContact(phone: Phone): Observable<Phone> {
    return this.http.post<Phone>(`http://api_rest_capi.test/api/phone`, phone);
  }

  updatePhoneContact(phone: Phone): Observable<Phone> {
    return this.http.put<Phone>(`http://api_rest_capi.test/api/phone/${phone.id}`, phone);
  }

  deletePhoneContact(id: number): Observable<Phone> {
    return this.http.delete<Phone>(`http://api_rest_capi.test/api/phone/${id}`);
  }
}
