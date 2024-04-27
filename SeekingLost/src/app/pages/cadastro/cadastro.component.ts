import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user-service.service';
import { User } from '../../class/User';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { sameValueValidator } from '../../validators/SameValueValidator.validator';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent {
  inputWidth: string = "80%"
  signupForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) {
    this.signupForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmedPassword: ['', [Validators.required, Validators.minLength(5)]]
    }, { validator: sameValueValidator('password', 'confirmedPassword') });
  }

  handleButtonClick(eventData: any) {
    if (eventData.id == "signup") {
      this.signup();
    }
  }

  signup() {
    var username = this.signupForm.get('username')?.value;
    var password = this.signupForm.get('password')?.value;
    var confirmedPassword = this.signupForm.get('confirmedPassword')?.value;

    if (password == confirmedPassword) {
      var user = new User(0, username, password);
      this.userService.createUser(user).subscribe({
        next: (data: User) => {
          console.log(data);
          this.router.navigate(['/login']);
        },
        error: (error: any) => {
          console.error(error);
        }
      });
    }
  }

  clearForm(): void {
    this.signupForm.reset({
      username: '',
      password: '',
      confirmedPassword: ''
    });
  }

}
