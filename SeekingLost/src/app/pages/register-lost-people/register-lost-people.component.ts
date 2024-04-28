import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-lost-people',
  templateUrl: './register-lost-people.component.html',
  styleUrl: './register-lost-people.component.scss'
})
export class RegisterLostPeopleComponent {
  imagePath = '../../../assets/images/people_1.jpeg';

  constructor(private router: Router) {}

  newRegister() {
    this.router.navigate(['/register-lost-people/form']);
  }
}
