import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Person } from '../models/Person';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  constructor(private http: HttpClient) {}

  getAllPersons(): Observable<Person[]> {
    return this.http.get<Person[]>(environment.server + '/person/bulk');
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

}
