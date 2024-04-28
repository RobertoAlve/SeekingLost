import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user-service/user-service.service';
import { User } from '../../class/User';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { sameValueValidator } from '../../validators/SameValueValidator.validator';
import { UserApiResponse } from '../../class/UserApiResponse';
import { EncryptPasswordService } from '../../services/encrypt-password/encrypt-password.service';
import { ModalService } from '../../services/modal-service/modal-service.service';
import { UserResponseEnum } from '../../enum/user-responseenenum';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent {
  inputWidth: string = "80%"
  signupForm: FormGroup;

  constructor(private formBuilder: FormBuilder, 
              private router: Router, 
              private userService: UserService, 
              private cryptService: EncryptPasswordService,
              private modalService: ModalService) {
   this.signupForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    password: ['', [Validators.required, Validators.minLength(5)]],
    confirmedPassword: ['', [Validators.required, Validators.minLength(5)]]
  }, { validator: sameValueValidator('password', 'confirmedPassword') } as AbstractControlOptions);
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
      this.cryptService.hashPassword(password)
        .then(hashedPassword => {
          var user = new User(username, hashedPassword);
          this.userService.createUser(user).subscribe({
            next: (data: UserApiResponse) => {
              console.log(data);

              this.modalService.openAlertModal(
                "Sucesso", 
                "Usuário cadastrado com sucesso!",
                "success"
              )

              this.router.navigate(['/login']);
            },
            error: (error: any) => {
              const errorResponse = UserApiResponse.fromError(error);
              var errorCode = 0;
              var message = "Erro ao cadastrar usuário!"

              for (const key in errorResponse.status) {
                if (Object.prototype.hasOwnProperty.call(errorResponse.status, key)) {
                  const userStatus = errorResponse.status[key];
                  errorCode = userStatus.statusCode;
                }
              }

              if (errorCode == UserResponseEnum.ALREADY_EXISTS.code) {
                message = message + " Email já cadastrado!"
              }

              this.modalService.openAlertModal(
                "Error", 
                message,
                "danger"
              )
            }
          });
      })
      .catch(error => {
        console.error('Ocorreu um erro ao criptografar a senha:', error);
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
