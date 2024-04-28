import { User } from "./User";

export class LostPerson {
    name: String;
    lastName: String;
    birthday: Date;
    token: String;
    user: User;

    constructor(name: String, lastName: String, birthday: Date, token: String, user: User) {
        this.name = name;
        this.lastName = lastName;
        this.birthday = birthday;
        this.token = token;
        this.user = user;
    }
}