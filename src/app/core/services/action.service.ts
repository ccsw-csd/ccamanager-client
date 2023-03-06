import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Action } from '../models/Action';
@Injectable({
  providedIn: 'root',
})
export class ActionService {
  constructor(private http: HttpClient) {}

  getAllActions(): Observable<Action[]> {
    return this.http.get<Action[]>(environment.server + '/action/');
  }
}
