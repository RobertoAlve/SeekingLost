import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email: string = "";
  password: string = "";
  inputWidth: string = "100%"

  constructor(private router: Router) {}

  login() {
    this.router.navigate(['/register-lost-people']);
  }
}
