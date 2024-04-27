import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  inputWidth: string = "100%"

  constructor(private router: Router, private userService: UserService) {}

  handleButtonClick(eventData: any) {
    if (eventData.id == "login") {
      this.login();
    }
  }

  login() {
    this.router.navigate(['/home']);
  }

  signup() {
    this.router.navigate(['/sign-up']);
  }
}
