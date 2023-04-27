import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LdapPerson } from '../models/LdapPerson';


@Injectable({
  providedIn: 'root'
})
export class LdapService {

  constructor(private http: HttpClient) { }

  checkPersons(): Observable<Boolean> {
    return this.http.get<Boolean>(environment.server + '/ldap/person/');
  }
  
  compareLdapToPersons(): Observable<LdapPerson[]> {
    return this.http.get<LdapPerson[]>(environment.server + '/ldap/person/compare/ldap');
  }
  comparePersonsToLdap(): Observable<LdapPerson[]> {
    return this.http.get<LdapPerson[]>(environment.server + '/ldap/person/compare/person');
  
  }

}
