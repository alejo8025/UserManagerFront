import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ResultModel } from 'src/app/models/resultModel';
import { UserModelDto } from 'src/app/models/userModelDto';
import { ApiService } from 'src/app/services/api.service';
import { DataGlobalService } from 'src/app/services/data.services/data-global.service';
import { MessageGlobalService } from '../../services/data.services/message-global.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  displayedColumns: string[] = ['id', 'username', 'firstname', 'lastname', 'documenttype', 'document', 'rol', 'select'];
  public dataSource = new MatTableDataSource<UserModelDto>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private router: Router,
              private apiService: ApiService,
              public dataGlobalService: DataGlobalService,
              public messageGlobalService: MessageGlobalService
    ) { }

  ngOnInit() {
    const userLogin = localStorage.getItem('user');
    if (!userLogin) {
      this.router.navigateByUrl('/login');
    } else {
      this.GetAllUsers();
      this.dataGlobalService.GetRoles();
      this.dataGlobalService.GetDocumentType();
    }
  }

  GetAllUsers() {
    this.dataGlobalService.loading = true;
    this.apiService.getAllUser().subscribe((res: ResultModel) => {
      if (res.isSuccess) {
        this.dataSource = new MatTableDataSource<UserModelDto>(res.data);
        this.dataSource.paginator = this.paginator;
      } else {
        this.messageGlobalService.showErrorMessage('error', res.returnMessage);
      }
    }, () => {
      this.messageGlobalService.showErrorMessage('error', 'Error connection service');
    });
  }

  editUser(element: any) {
    this.dataGlobalService.userToEdit = element;
    console.log(this.dataGlobalService.userToEdit);
    this.router.navigateByUrl('/edituser');
  }

  newUser() {
    this.router.navigateByUrl('/newuser');
  }

}


