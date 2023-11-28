import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from 'src/environments/environment';
import { Customer } from '../models/Customer';
import { CustomerSimple } from '../models/CustomerSimple';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  getAllCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(environment.server + "/customer/");
  }
  
  save(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(environment.server + "/customer/", customer);
  }

  delete(id: number) : Observable<any> {
    return this.http.delete(environment.server + "/customer/" + id);
  }

  getCustomersSecured() : Observable<CustomerSimple[]> {
    return this.http.get<Customer[]>(environment.server + "/customer/secured");
  }
}
