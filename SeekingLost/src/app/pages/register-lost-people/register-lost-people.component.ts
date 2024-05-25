import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LostPersonService } from '../../services/lost-person/lost-person.service';
import { PersonResponse } from '../../class/PersonResponse';

@Component({
  selector: 'app-register-lost-people',
  templateUrl: './register-lost-people.component.html',
  styleUrl: './register-lost-people.component.scss'
})
export class RegisterLostPeopleComponent {
  lostPersons: PersonResponse[] = [];

  constructor(private router: Router, private lostPersonService: LostPersonService) { }

  ngOnInit() {
    var userId = sessionStorage.getItem('userId');
    if (userId != null) {
      this.lostPersonService.getLostPersons(userId).subscribe({
        next: (data: any) => {
          this.lostPersons = data;
        },
        error: (error: any) => {
        }
      });
    }
  }

  newRegister() {
    this.router.navigate(['/register-lost-people/form']);
  }

}
