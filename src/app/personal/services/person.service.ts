import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Person } from '../models/Person';
import { Intern } from 'src/app/intern/models/Intern';
import { LdapPerson } from '../models/LdapPerson';
import { ListsLdapPerson } from '../models/ListsLdapPerson';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  constructor(private http: HttpClient) {}

  getAllPersons(): Observable<Person[]> {
    return this.http.get<Person[]>(environment.server + '/person/');
  }
  save(person: Person): Observable<Person> {
    return this.http.post<Person>(environment.server + '/person/', person);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(environment.server + '/person/' + id);
  }

  searchPerson(filter: string): Observable<Person[]> {
    return this.http.get<Person[]>(environment.server + "/person/filter/" + filter)
  }

  searchIntern(filter:string):Observable<Intern[]>{
    return this.http.get<Intern[]>(environment.server +"/person/scholar/"+filter)
  }

  checkPersons(): Observable<Boolean> {
    return this.http.get<Boolean>(environment.server + '/ldap/person/');
  }
  
  compareLdapToPersons(): Observable<LdapPerson[]> {
    return this.http.get<LdapPerson[]>(environment.server + '/ldap/person/compare/ldap');
  }
  comparePersonsToLdap(): Observable<LdapPerson[]> {
    return this.http.get<LdapPerson[]>(environment.server + '/ldap/person/compare/person');
  }

  findListLdapUsernames(): Observable<String[]> {
    return this.http.get<String[]>(environment.server + '/ldap/person/list');
  }

  checkInterns(): Observable<Boolean> {
    return this.http.get<Boolean>(environment.server + '/ldap/intern/');
  }


  findListLdapUsernamesInterns(): Observable<String[]> {
    return this.http.get<String[]>(environment.server + '/ldap/intern/list');
  }


  compareLdapPersons(): Observable<ListsLdapPerson> {
    return this.http.get<ListsLdapPerson>(environment.server + '/ldap/person/compare/personLdap');
  }

  compareLdapInterns(): Observable<ListsLdapPerson> {
    return this.http.get<ListsLdapPerson>(environment.server + '/ldap/person/compare/internLdap');
  }

}
