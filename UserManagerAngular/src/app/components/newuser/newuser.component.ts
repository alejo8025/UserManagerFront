import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormControl} from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { DataGlobalService } from 'src/app/services/data.services/data-global.service';
import { RolModel } from 'src/app/models/rolModel';
import { DocumentTypeModel } from 'src/app/models/documentTypeModel';
import { NewUserModel } from 'src/app/models/newUserModel';
import { ResultModel } from 'src/app/models/resultModel';

@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.component.html',
  styleUrls: ['./newuser.component.css']
})
export class NewuserComponent implements OnInit {
  public rolesList: RolModel[];
  public documentList: DocumentTypeModel[];
  public newUserModel: NewUserModel = new NewUserModel();
  disableSelect = new FormControl(false);
  constructor(private router: Router,
              private apiService: ApiService,
              public dataGlobalService: DataGlobalService) { }

  ngOnInit() {
    const userLogin = localStorage.getItem('user');
    if (!userLogin) {
      this.router.navigateByUrl('/login');
    } else {
      const tempRoles = JSON.parse(localStorage.getItem('roles'));
      const tempDocuments = JSON.parse(localStorage.getItem('documents'));
      if (!tempRoles || !tempDocuments) {
        this.dataGlobalService.GetRoles();
        this.dataGlobalService.GetDocumentType();
      }
      this.rolesList = JSON.parse(localStorage.getItem('roles'));
      this.documentList = JSON.parse(localStorage.getItem('documents'));
    }
  }

  saveUser() {
    console.log(this.newUserModel);
    this.apiService.saveNewUser(this.newUserModel).subscribe((res: ResultModel) => {
      if (res.isSuccess) {
        alert('User register success');
        this.router.navigateByUrl('/main');
      } else {
        alert('User register unsuccess');
      }
    });
  }

}
