import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserResults } from '../../interfaces/address';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserList(): Observable<UserResults> {
    return this.http.get<UserResults>(`http://api_rest_capi.test/api/contacts`);
  }
}
