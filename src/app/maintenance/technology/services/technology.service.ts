import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Technology } from '../models/Technology';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TechnologyService {
  constructor(private http: HttpClient) {}

  findAll(): Observable<Technology[]> {
    return this.http.get<Technology[]>(environment.server + '/technology/');
  }

  save(item: Technology): Observable<Technology> {
    return this.http.post<Technology>(
      environment.server + '/technology/',
      item
    );
  }

  deleteTechnology(id: number): Observable<void> {
    return this.http.delete<void>(environment.server + '/technology/' + id);
  }

  getTechnology(id: number): Observable<Technology> {
    return this.http.get<Technology>(environment.server + '/technology/' + id);
  }
}
