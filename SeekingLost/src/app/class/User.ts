export class User {
    id?: Number;
    password: string;
    username: string;

    constructor(id: Number, password: string, username: string) {
        this.id = id;
        this.password = password;
        this.username = username;
    }
}