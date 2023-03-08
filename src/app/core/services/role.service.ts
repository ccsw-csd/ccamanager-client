import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Person_role } from '../models/Person_role';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  constructor(private http: HttpClient) {}

  getAllRoles(): Observable<Person_role[]> {
    return this.http.get<Person_role[]>(environment.server + '/person-roles/');
  }
}
