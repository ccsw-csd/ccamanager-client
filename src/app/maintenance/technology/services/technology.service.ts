import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Technology } from '../models/Technology';

@Injectable({
  providedIn: 'root'
})
export class TechnologyService {

  constructor(private http:HttpClient){ }

  getAllTechnologyService():Observable<Technology[]>{
    return this.http.get<Technology[]>(environment.server+"/technology/");
  }
}
