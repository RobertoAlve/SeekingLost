import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  constructor(private router: Router) { }

  shouldShowFooter(): boolean {
    const currentRoute = this.router.url;
    const routesWithoutHeader = ['/login', '/sign-up'];

    return !routesWithoutHeader.includes(currentRoute);
  }
}
