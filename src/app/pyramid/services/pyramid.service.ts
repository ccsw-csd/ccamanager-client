import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {Pyramid} from '../models/Pyramid';
import { CountIndexGraph } from '../models/CountIndexGraph';
import { CountGraph } from '../models/CountGraph';
@Injectable({
  providedIn: 'root'
})
export class PyramidService {

  constructor(private http: HttpClient) { }

  getAllPyramids(): Observable<Pyramid[]> {
    return this.http.get<Pyramid[]>(environment.server + "/pyramid/");
  }
  
  getProfileCountIndexGraph(): Observable<CountIndexGraph[]> {
    return this.http.get<CountIndexGraph[]>(environment.server + "/pyramid/profileCountIndexGraph");
  }

  getProfileCountGraph(): Observable<CountGraph[]> {
    return this.http.get<CountGraph[]>(environment.server + "/pyramid/profileCountGraph");
  }

  save(pyramid:Pyramid[]):Observable<Pyramid[]>{
    return this.http.post<Pyramid[]>(environment.server+"/pyramid/",pyramid);
  }
}
