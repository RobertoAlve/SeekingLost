import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { LostPerson } from '../../class/LostPerson';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ILostPersonService } from '../../interfaces/ilostperson-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LostPersonService implements ILostPersonService {

  private environment = environment;
  private finalEndpoint = environment.API_ENDPOINT + "/person"

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private httpClient: HttpClient) { }
  
  getLostPersons(userId: String): Observable<any> {
    return this.httpClient.get<any>(this.finalEndpoint + "/" + userId);
  }

  createLostPerson(person: LostPerson): Observable<any> {
    console.log(JSON.stringify(person))
    return this.httpClient.post<any>(this.finalEndpoint + "/register", JSON.stringify(person), this.httpOptions);
  }

} 
