import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { LostPerson } from '../../class/LostPerson';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ILostPersonService } from '../../interfaces/ilostperson-service';
import { Observable } from 'rxjs';
import { PersonApiResponse } from '../../class/PersonApiResponse';
import { PersonResponse } from '../../class/PersonResponse';

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
  
  getLostPersons(userId: String): Observable<PersonResponse> {
    return this.httpClient.get<any>(this.finalEndpoint + "/" + userId);
  }

  createLostPerson(person: LostPerson): Observable<PersonApiResponse> {
    return this.httpClient.post<any>(this.finalEndpoint + "/register", JSON.stringify(person), this.httpOptions);
  }

} 
