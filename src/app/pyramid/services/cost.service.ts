import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CostCenterCostIndex } from '../models/CostCenterCostIndex';
import { PyramidGraph } from '../models/PyramidGraph';
import { PyramidGraphCustomer } from '../models/PyramidGraphCustomer';

@Injectable({
  providedIn: 'root'
})
export class CostService {

  constructor(private http: HttpClient) { }

  getCostCenterCostIndex(): Observable<CostCenterCostIndex[]> {
    return this.http.get<CostCenterCostIndex[]>(environment.server + "/cost/index");
  }
  
  getPyramidGraph(): Observable<PyramidGraph[]> {
    return this.http.get<PyramidGraph[]>(environment.server + "/cost/pyramid/global");
  }

  getPyramidGraphCustomer(): Observable<PyramidGraphCustomer[]> {
    return this.http.get<PyramidGraphCustomer[]>(environment.server + "/cost/pyramid/customer");
  }
}
