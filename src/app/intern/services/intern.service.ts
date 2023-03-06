import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Intern } from '../models/Intern';
@Injectable({
  providedIn: 'root',
})
export class InternService {
  constructor(private http: HttpClient) {}

  getAllInterns(): Observable<Intern[]> {
    return this.http.get<Intern[]>(environment.server + "/intern/");
  }
}
