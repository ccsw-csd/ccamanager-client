import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Intern } from '../models/Intern';
import { TimeLine } from '../models/TimeLine';
import moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class InternService {
  constructor(private http: HttpClient) { }

  getAllInterns(): Observable<Intern[]> {
    return this.http.get<Intern[]>(environment.server + "/intern/");
  }
  save(intern: Intern): Observable<Intern> {

    let data: any = Object.assign({}, intern);

    if (intern.startDate) data.startDate = (moment(intern.startDate)).format('YYYY-MM-DD');
    if (intern.endDate) data.endDate = (moment(intern.endDate)).format('YYYY-MM-DD');
    if (intern.contractDate) data.contractDate = (moment(intern.contractDate)).format('YYYY-MM-DD');

    return this.http.post<Intern>(environment.server + "/intern/", data);
  }

  saveBulk(intern: Intern, quantity: number): Observable<Intern> {

    let data: any = Object.assign({}, intern);

    if (intern.startDate) data.startDate = (moment(intern.startDate)).format('YYYY-MM-DD');
    if (intern.endDate) data.endDate = (moment(intern.endDate)).format('YYYY-MM-DD');
    if (intern.contractDate) data.contractDate = (moment(intern.contractDate)).format('YYYY-MM-DD');


    return this.http.post<Intern>(environment.server + "/intern/predict/" + quantity, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(environment.server + "/intern/" + id);
  }

  findTimelineByDate(startDate: Date, endDate: Date): Observable<TimeLine[]> {
    return this.http.post<TimeLine[]>(environment.server + "/intern/dateFilter", { startDate: startDate, endDate: endDate });
  }
}
