import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataGlobalService  {
  public loading: boolean;
  userName: string;

  constructor() { }
}
