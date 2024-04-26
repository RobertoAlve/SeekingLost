import { Injectable } from '@angular/core';
import { IUserService } from '../interfaces/iuser-service';
import { User } from '../class/User';
import { environment } from '../../environments/environments';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService implements IUserService {

  private environment = environment;
  private finalEndpoint = environment.API_ENDPOINT + "/user"

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private httpClient: HttpClient) { }

  getUser(id: Number): Observable<User> {
    return this.httpClient.get<User>(this.finalEndpoint + id)
      .pipe(
        catchError(this.handleError)
      );
  }

  createUser(user: User): Observable<User> {
    return this.httpClient.post<User>(this.finalEndpoint + "/register", JSON.stringify(user), this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
  
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Código do erro: ${error.status}, ` + `mensagem: ${error.message}`;
    }
  
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }
}
