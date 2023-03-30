import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Person } from '../models/Person';
import { Intern } from 'src/app/intern/models/Intern';
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

  searchIntern(filter:string):Observable<Intern[]>{
    return this.http.get<Intern[]>(environment.server +"/person/scholar/"+filter)
  }
}
