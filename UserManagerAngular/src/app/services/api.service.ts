import { Injectable } from '@angular/core';
import { HttpUtilsService } from '../commons/http-base.service';
import { Observable } from 'rxjs';
import { ResultModel } from '../models/resultModel';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(public http: HttpUtilsService, public httpIP: HttpClient) {}

      public postLogin(params: any): Observable<ResultModel> {
        return this.http.post('Login', params);
      }

}
