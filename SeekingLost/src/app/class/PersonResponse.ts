export class PersonResponse {
    firstName: String;
    lastName: String;
    birthDay: Date;
    token: String;

    constructor(firstName: String, lastName: String, birthDay: Date, token: String) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDay = birthDay;
        this.token = token;
    }
}