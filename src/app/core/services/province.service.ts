import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from 'src/environments/environment';
import { Province } from '../models/Province';

@Injectable({
  providedIn: 'root'
})
export class ProvinceService {

  constructor(private http:HttpClient) { }

  getAllProvinces():Observable<Province[]>{
    return this.http.get<Province[]>(environment.server+"/province/");
  }
}
