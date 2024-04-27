export class UserStatus {
    username: string;
    statusCode: number;
    hasError: boolean;
  
    constructor(username: string, statusCode: number, hasError: boolean) {
      this.username = username;
      this.statusCode = statusCode;
      this.hasError = hasError;
    }
  }