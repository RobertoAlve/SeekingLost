import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterLostPeopleComponent } from './pages/register-lost-people/register-lost-people.component';
import { FormRegisterPeopleComponent } from './pages/form-register-people/form-register-people.component';
import { AboutComponent } from './pages/about/about.component';
import { PeopleInfoComponent } from './pages/people-info/people-info.component';
import { AuthGuard } from './guard/auth-guard.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [ AuthGuard ] }, 
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: CadastroComponent },
  { path: 'home', component: HomeComponent, canActivate: [ AuthGuard ] },
  { path: 'about', component: AboutComponent, canActivate: [ AuthGuard ] },
  { path: 'register-lost-people', component: RegisterLostPeopleComponent, canActivate: [ AuthGuard ] },
  { path: 'register-lost-people/form', component: FormRegisterPeopleComponent, canActivate: [ AuthGuard ] },
  { path: 'register-lost-people/people-info', component: PeopleInfoComponent, canActivate: [ AuthGuard ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
