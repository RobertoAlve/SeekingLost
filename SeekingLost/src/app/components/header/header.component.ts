import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(private router: Router) { }

  shouldShowHeader(): boolean {
    const currentRoute = this.router.url;
    const routesWithoutHeader = ['/login', '/sign-up'];

    return !routesWithoutHeader.includes(currentRoute);
  }

}
