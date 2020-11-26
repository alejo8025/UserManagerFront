import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { JwtHelper } from './jwt-helper';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

// Aquí se va a construir el interceptor para los servicios y todo la configuración de las uri de las Api.
export class HttpUtilsService {
// se optiene la url del api , utilizando el documento de enviroments.
  private uri_api = environment.uri_api;
  private headers: HttpHeaders;
  private jwt: JwtHelper = new JwtHelper();

  constructor(public http: HttpClient, private router: Router) { }

  private getHttpHeadersConfigs() {
    let headers: HttpHeaders = new HttpHeaders();
    const token = localStorage.getItem('Authorization');

    if (token) {
      headers = headers.append('Authorization', 'Bearer ' + token);
    } else {
      headers = headers.append('ClientId', environment.clientId);
    }
    headers.set('Content-Type', 'application/json; charset=utf-8');
    headers.set('X-Frame-Options', 'SAMEORIGIN');
    return headers;
  }

  usingHttpServices(endPoint: string, type: string, params?: any) {
    this.headers = this.getHttpHeadersConfigs();
    const uri = this.uri_api + endPoint;
    let request;

    switch (type) {
      case 'get':
        request = this.http.get(uri, { params, headers: this.headers });
        break;
      case 'post':
        request = this.http.post(uri, params, { headers: this.headers });
        break;
      case 'put':
        request = this.http.put(uri, params, { headers: this.headers });
        break;
      case 'delete':
        request = this.http.delete(uri, { params, headers: this.headers });
        break;
      default:
        return 'Http method not supported.';
    }
    return request;
  }


  public get(endPoint: string, params?: any) {
    return this.usingHttpServices(endPoint, 'get', params);
  }

  public post(endPoint: string, params?: any) {
    return this.usingHttpServices(endPoint, 'post', params);
  }

  public put(endPoint: string, params?: any, headers?: any) {
    return this.usingHttpServices(endPoint, 'put', params);
  }

  public delete(endPoint: string, params?: any, headers?: any) {
    return this.usingHttpServices(endPoint, 'delete', params);
  }
}
