import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EdituserComponent } from './components/edituser/edituser.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { NewuserComponent } from './components/newuser/newuser.component';

const routes: Routes = [
  { path: 'main', component: MainComponent},
  { path: 'newuser', component: NewuserComponent },
  { path: 'edituser', component: EdituserComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
