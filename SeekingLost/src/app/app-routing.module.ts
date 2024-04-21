import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { RegisterLostPeopleComponent } from './pages/register-lost-people/register-lost-people.component';
import { FormRegisterPeopleComponent } from './pages/form-register-people/form-register-people.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, 
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: CadastroComponent },
  { path: 'register-lost-people', component: RegisterLostPeopleComponent },
  { path: 'register-lost-people/form', component: FormRegisterPeopleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
