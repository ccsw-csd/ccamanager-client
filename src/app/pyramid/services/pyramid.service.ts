import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {Pyramid} from '../models/Pyramid';
@Injectable({
  providedIn: 'root'
})
export class PyramidService {

  constructor(private http: HttpClient) { }

  getAllPyramids(): Observable<Pyramid[]> {
    return this.http.get<Pyramid[]>(environment.server + "/pyramid/");
  }
}
