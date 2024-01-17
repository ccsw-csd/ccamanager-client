import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from 'src/environments/environment';
import { PersonCustomer } from '../models/PersonCustomer';
import { OrganizationCustomer } from '../models/OrganizationCustomer';


@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(private http: HttpClient) { }

  getPersonCustomer(customerId: number) : Observable<PersonCustomer[]> {
    return this.http.get<PersonCustomer[]>(environment.server + "/customer/" + customerId + "/organization-edit");
  }

  savePersonCustomer(list: PersonCustomer[]) : Observable<PersonCustomer[]> {
    return this.http.post<PersonCustomer[]>(environment.server + "/customer/organization-edit", {data: list});
  }

  getOrganizationCustomer(customersId: string) : Observable<OrganizationCustomer[]> {
    return this.http.get<OrganizationCustomer[]>(environment.server + "/customer/organization-chart?ids="+customersId);
  }

}
