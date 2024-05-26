import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private router: Router) {}

  canActivate(): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      var userId =  sessionStorage.getItem("userId");
      console.log("Ahhhhh")
      if (userId != null) {
        console.log(userId)
        observer.next(true); // Permite a navegação se o usuário estiver logado
      } else {
        this.router.navigate(['/login']); // Redireciona para a página de login se o usuário não estiver logado
        observer.next(false); // Impede a navegação
      }
      observer.complete();
    });
  }
}