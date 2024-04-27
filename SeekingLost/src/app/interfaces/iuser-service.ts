import { Observable } from "rxjs";
import { User } from "../class/User";
import { UserApiResponse } from "../class/UserApiResponse";

export interface IUserService {

    getUser(id: Number): Observable<User>;

    createUser(user: User): Observable<UserApiResponse>;

}
