import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Level } from '../models/Level';
@Injectable({
  providedIn: 'root',
})
export class LevelService {
  constructor(private http: HttpClient) {}

  getAllLevels(): Observable<Level[]> {
    return this.http.get<Level[]>(environment.server + '/level/');
  }
}
