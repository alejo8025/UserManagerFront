import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'UserManagerAngular';

  constructor(private router: Router) { }

  exit() {
    this.router.navigateByUrl('/login');
  }

  home() {
    this.router.navigateByUrl('/main');
  }
}
