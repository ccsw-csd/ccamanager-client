import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from 'src/environments/environment';
import { EducationCenter } from '../model/EducationCenter';

@Injectable({
  providedIn: 'root'
})
export class EducationCenterService {

  constructor(private http:HttpClient) { }

  getAllEducationCenters():Observable<EducationCenter[]>{
    return this.http.get<EducationCenter[]>(environment.server+"/educationCenter/");
  }
  save(educationCenter:EducationCenter):Observable<EducationCenter>{
    return this.http.post<EducationCenter>(environment.server+"/educationCenter/",educationCenter);
  }

  delete(id:number):Observable<any>{
    return this.http.delete(environment.server+"/educationCenter/"+id);
  }
}
