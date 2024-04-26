import { Observable } from "rxjs";
import { User } from "../class/User";

export interface IUserService {

    getUser(id: Number): Observable<User>;

    createUser(user: User): Observable<User>;

}
