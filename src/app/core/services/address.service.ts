import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address } from '../../interfaces/address';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: HttpClient) { }

  getAddressContactById(id: number): Observable<Address> {
    return this.http.get<Address>(`http://api_rest_capi.test/api/address/${id}`);
  }

  createAddressContact(address: Address): Observable<Address> {
    return this.http.post<Address>(`http://api_rest_capi.test/api/address`, address);
  }

  updateAddressContact(address: Address): Observable<Address> {
    return this.http.put<Address>(`http://api_rest_capi.test/api/address/${address.id}`, address);
  }

  deleteAddressContact(id: number): Observable<Address> {
    return this.http.delete<Address>(`http://api_rest_capi.test/api/address/${id}`);
  }
}
