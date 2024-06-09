import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user-service/user-service.service';
import { UserApiResponse } from '../../class/UserApiResponse';
import { ModalService } from '../../services/modal-service/modal-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(private router: Router,
              private userService: UserService,
              private modalService: ModalService) {}

  shouldShowHeader(): boolean {
    const currentRoute = this.router.url;
    const routesWithoutHeader = ['/login', '/sign-up'];

    return !routesWithoutHeader.includes(currentRoute);
  }

  onClickLogoff() {
    console.log("Clicou");

    const username = sessionStorage.getItem("userId");
    console.log("session", username);

    this.userService.logoffUser(username).subscribe({
      next: (data: UserApiResponse) => {
        console.log(data);

        this.modalService.openAlertModal(
          "Sucesso",
          "Ação Válida!",
          "success"
        )
      },
      error: (error: any) => {
        console.log(error);

        this.modalService.openAlertModal(
          "Error",
          "Ação Invalida!",
          "danger"
        )
      }
    });
  }
}
