import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user-service/user-service.service';
import { User } from '../../class/User';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserApiResponse } from '../../class/UserApiResponse';
import { EncryptPasswordService } from '../../services/encrypt-password/encrypt-password.service';
import { ModalService } from '../../services/modal-service/modal-service.service';
import { UserResponseEnum } from '../../enum/user-responseenenum';
import { ok } from 'assert';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  inputWidth: string = "100%"
  authenticatForm: FormGroup;

  constructor(private router: Router,
              private userService: UserService,
              private formBuilder: FormBuilder,
              private cryptService: EncryptPasswordService,
              private modalService: ModalService) { this.authenticatForm = this.formBuilder.group({ username: [], password: [] })}

  handleButtonClick(eventData: any) {
    if (eventData.id == "login") {
      this.login();
    }
  }

  login() {
    const username = this.authenticatForm.get('username')?.value;
    const passwd = this.authenticatForm.get('password')?.value;
    const user = new User(username, passwd);

    this.userService.loginUser(user).subscribe({
      next: (data: UserApiResponse) => {
        // console.log(data);

        for (const key in data.status) {
          if (Object.prototype.hasOwnProperty.call(data.status, key)) {
            this.cryptService.verifyPassword(passwd, data.status[key].username).then( resultVerify => {
              let titleModal, messageModal;

              if ( resultVerify ) {
                titleModal = "Sucesso..."
                messageModal = "Login efetuado com Sucesso..."

                this.router.navigate(['/home']);
              } else {
                titleModal = "Erro..."
                messageModal = "Senha ou E-mail incorreto. Tente novamente..."
              }

              this.modalService.openAlertModal(
                titleModal,
                messageModal,
                resultVerify == true ? 'success' : 'danger'
              )              
            })
          }
        }
      },
      error: (error: any) => {
        // console.log(error);

        const errorResponse = UserApiResponse.fromError(error);
        let errorCode = 0;

        for (const key in errorResponse.status) {
          if (Object.prototype.hasOwnProperty.call(errorResponse.status, key)) {
            const userStatus = errorResponse.status[key];
            errorCode = userStatus.statusCode;
          }
        }

        this.modalService.openAlertModal(
          "Error",
          "Erro ao efetuar o Login do usuário!",
          "danger"
        )
      }
    });
  }

  signup() {
    this.router.navigate(['/sign-up']);
  }
}
