import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent {
  email: string = "";
  password: string = "";
  inputWidth: string = "60%"

  constructor(private router: Router) {}

  signup() {
    this.router.navigate(['/login']);
  }

}
