import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Education } from '../models/Education';
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EducationService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<Education[]> {

    return this.http.get<Education[]>(environment.server + "/education/");
  }

  save(item: Education): Observable<Education> {
    let url = environment.server + '/education/';

    if (item.id != null) {
      url +=  item.id;
    }
    return this.http.put<Education>(url, item);
  }

  deleteEducation(id:number): Observable<void> {
    return this.http.delete<void>(environment.server + '/education/' + id);


  }

  getEducation(id:number): Observable<Education> {

    return this.http.get<Education>(environment.server + "/education/" + id);
  }


}
