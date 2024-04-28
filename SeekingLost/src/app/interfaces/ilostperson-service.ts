import { Observable } from "rxjs";
import { LostPerson } from "../class/LostPerson";
import { PersonResponse } from "../class/PersonResponse";
import { PersonApiResponse } from "../class/PersonApiResponse";

export interface ILostPersonService {

    getLostPersons(userId: String): Observable<PersonResponse>;

    createLostPerson(person: LostPerson): Observable<PersonApiResponse>;

}
