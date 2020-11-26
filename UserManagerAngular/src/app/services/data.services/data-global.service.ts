import { Injectable } from '@angular/core';
import { DocumentTypeModel } from 'src/app/models/documentTypeModel';
import { ResultModel } from 'src/app/models/resultModel';
import { RolModel } from 'src/app/models/rolModel';
import { ApiService } from 'src/app/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class DataGlobalService  {
  public loading: boolean;
  public userName: string;
  public userToEdit: any;
  public Roles: RolModel[];
  public DocumentTypes: DocumentTypeModel[];

  constructor(private apiService: ApiService) { }

  GetRoles() {
      this.apiService.getRoles().subscribe((res: ResultModel) => {
        if (res.isSuccess) {
          localStorage.setItem('roles', JSON.stringify(res.data));
        }
      }, () => {
      });
  }

  GetDocumentType() {
      this.apiService.getDocumentTypes().subscribe((res: ResultModel) => {
        if (res.isSuccess) {
          localStorage.setItem('documents', JSON.stringify(res.data));
        }
      }, () => {
      });
  }
}
