import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Person } from '../models/Person';
import { Intern } from 'src/app/intern/models/Intern';
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
    return this.http.get<Person[]>(environment.server + '/person/filter/' + filter)
  }

  searchIntern(filter:string):Observable<Intern[]>{
    return this.http.get<Intern[]>(environment.server + '/person/scholar/' + filter)
  }

  checkPersons(): Observable<Boolean> {
    return this.http.get<Boolean>(environment.server + '/ldap/person/check');
  }

  checkInterns(): Observable<Boolean> {
    return this.http.get<Boolean>(environment.server + '/ldap/intern/check');
  }

  findListLdapUsernames(): Observable<String[]> {
    return this.http.get<String[]>(environment.server + '/ldap/person/list');
  }

  findListLdapUsernamesInterns(): Observable<String[]> {
    return this.http.get<String[]>(environment.server + '/ldap/intern/list');
  }

  compareLdapPersons(): Observable<ListsLdapPerson> {
    return this.http.get<ListsLdapPerson>(environment.server + '/ldap/person/compare');
  }

  compareLdapInterns(): Observable<ListsLdapPerson> {
    return this.http.get<ListsLdapPerson>(environment.server + '/ldap/intern/compare');
  }

}
