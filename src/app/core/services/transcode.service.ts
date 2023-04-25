import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from 'src/environments/environment';
import { Center } from '../models/Center';

@Injectable({
  providedIn: 'root'
})
export class TranscodeService {

  constructor(private http:HttpClient) { }

  getCenterByName(name:string):Observable<Center>{
    return this.http.get<Center>(environment.server+"/centerTranscode/"+name);
  }
}
