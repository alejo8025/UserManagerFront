import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormControl} from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { DataGlobalService } from 'src/app/services/data.services/data-global.service';
import { RolModel } from 'src/app/models/rolModel';
import { DocumentTypeModel } from 'src/app/models/documentTypeModel';
import { ResultModel } from 'src/app/models/resultModel';
import { EditUserModel } from 'src/app/models/editUserModel';
import { MessageGlobalService } from '../../services/data.services/message-global.service';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {
  public rolesList: RolModel[];
  public documentList: DocumentTypeModel[];
  public editUserModel: EditUserModel = new EditUserModel();
  disableSelect = new FormControl(false);
  constructor(private router: Router,
              private apiService: ApiService,
              public dataGlobalService: DataGlobalService,
              public messageGlobalService: MessageGlobalService) { }

  ngOnInit() {
    const userLogin = localStorage.getItem('user');
    if (!userLogin) {
      this.router.navigateByUrl('/login');
    } else {
      console.log(this.dataGlobalService.userToEdit);
      console.log(this.dataGlobalService.userToEdit.userid);
      this.editUserModel.userId = this.dataGlobalService.userToEdit.userid;
      this.editUserModel.firstname = this.dataGlobalService.userToEdit.firstname;
      this.editUserModel.lastname = this.dataGlobalService.userToEdit.lastname;
      this.editUserModel.rol = this.dataGlobalService.userToEdit.rol;
      const tempRoles = JSON.parse(localStorage.getItem('roles'));
      if (!tempRoles) {
        this.dataGlobalService.GetRoles();
      }
      this.rolesList = JSON.parse(localStorage.getItem('roles'));
    }
  }

  editUser() {
    console.log(this.editUserModel);
    this.apiService.editUser(this.editUserModel).subscribe((res: ResultModel) => {
      if (res.isSuccess) {
        this.messageGlobalService.showErrorMessage('success', 'User register success');
        this.router.navigateByUrl('/main');
      } else {
        this.messageGlobalService.showErrorMessage('error', res.returnMessage);
      }
    }, () => {
      this.messageGlobalService.showErrorMessage('error', 'Error connection service');
    });
  }

}
