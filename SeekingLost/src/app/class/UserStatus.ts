export class UserStatus {
    username: string;
    statusCode: number;
  
    constructor(username: string, statusCode: number) {
      this.username = username;
      this.statusCode = statusCode;
    }
  }