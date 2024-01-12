import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { environment } from 'src/environments/environment';
import { CostCenter } from '../models/CostCenter';
import { CostCenterSimple } from '../models/CostCenterSimple';

@Injectable({
  providedIn: 'root'
})
export class CostCenterService {

  constructor(private http:HttpClient) { }

  getAllCostCenters(): Observable<CostCenter[]>{
    return this.http.get<CostCenter[]>(environment.server + "/costCenter/");
  }

  get(id: number): Observable<CostCenter>{
    return this.http.get<CostCenter>(environment.server + "/costCenter/" + id);
  }
  
  save(costCenter: CostCenter): Observable<CostCenter>{
    return this.http.post<CostCenter>(environment.server + "/costCenter/", costCenter);
  }

  delete(id: number): Observable<any>{
    return this.http.delete(environment.server + "/costCenter/" + id);
  }

  getAllCostCentersSimple(): Observable<CostCenterSimple[]>{
    return this.http.get<CostCenterSimple[]>(environment.server + "/costCenter/simple");
  }
}
