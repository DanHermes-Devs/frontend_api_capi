import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address } from '../../interfaces/address';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  apiurl = environment.api_url;

  constructor(private http: HttpClient) { }

  getAddressContactById(id: number): Observable<Address> {
    return this.http.get<Address>(this.apiurl + "/" + id);
  }

  createAddressContact(address: Address): Observable<Address> {
    return this.http.post<Address>(this.apiurl + "/address", address);
  }

  updateAddressContact(address: Address): Observable<Address> {
    return this.http.put<Address>(this.apiurl + "/address/" + address.id, address);
  }

  deleteAddressContact(id: number): Observable<Address> {
    return this.http.delete<Address>(this.apiurl + "/address/" + id);
  }
}
