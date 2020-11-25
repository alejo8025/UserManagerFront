import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../../services/token.service';
import { ApiService } from '../../services/api.service';
import { ResultModel } from '../../models/resultModel';
import { DataGlobalService } from '../../services/data.services/data-global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public inputPassword: string;
  public inputUsername: string;
  constructor(
    private router: Router,
    private tokenServices: TokenService,
    private apiService: ApiService,
    public dataGlobalService: DataGlobalService
  ) {
    localStorage.clear();
    this.GenerateTokenAplication();
  }

  ngOnInit() {
  }

  GenerateTokenAplication() {
    this.dataGlobalService.loading = true;
    this.tokenServices.getToken().subscribe(
      (res: ResultModel) => {
        if (res.isSuccess) {
          localStorage.setItem('Authorization', res.data.accessToken);
        }
      }
    , () => {
      this.dataGlobalService.loading = false;
    });
  }

  login() {
    let body = {
      "userName": this.inputUsername,
      "password": this.inputPassword
    };
    this.dataGlobalService.loading = true;
    this.apiService.postLogin(body).subscribe((res: ResultModel) => {

      if (res.isSuccess) {
        localStorage.setItem('user', JSON.stringify(res.data));
        this.dataGlobalService.userName = `${res.data.firstname} ${res.data.lastname}!`;
        this.dataGlobalService.loading = false;

        this.router.navigateByUrl('/main');
      } else {
        let message;
        if (res.returnMessage === 'Wrong user or password') {
          message = 'Usuario o contraseña incorrecta';
        } else {
          message = 'Usuario no autorizado';
        }
        this.inputUsername = '';
        this.inputPassword = '';
      }
    }, () => {


    });
  }

}
