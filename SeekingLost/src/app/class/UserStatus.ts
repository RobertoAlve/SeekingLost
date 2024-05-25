export class UserStatus {
    username: string;
    id: string;
    statusCode: number;
  
    constructor(username: string, id: string, statusCode: number) {
      this.username = username;
      this.id = id;
      this.statusCode = statusCode;
    }
  }