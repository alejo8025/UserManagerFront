import { Injectable } from '@angular/core';
import { HttpUtilsService } from '../commons/http-base.service';
import { Observable } from 'rxjs';
import { ResultModel } from '../models/resultModel';
import { HttpClient } from '@angular/common/http';
import { NewUserModel } from '../models/newUserModel';
import { EditUserModel } from '../models/editUserModel';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  constructor(public http: HttpUtilsService, public httpIP: HttpClient) {}

      public postLogin(params: any): Observable<ResultModel> {
        return this.http.post('Login', params);
      }

      public getAllUser(): Observable<ResultModel> {
        return this.http.get('Users/GetAllUsers');
      }

      getDocumentTypes(): Observable<ResultModel> {
        return this.http.get('DocumentTypes/GetAllDocumentTypes');
      }
      getRoles(): Observable<ResultModel> {
        return this.http.get('Roles/GetAllRoles');
      }

      saveNewUser(newUserModel: NewUserModel) {
        return this.http.post('Users/NewUser', newUserModel);
      }

      editUser(editUserModel: EditUserModel) {
        return this.http.post('Users/UpdateUser', editUserModel);
      }

}
