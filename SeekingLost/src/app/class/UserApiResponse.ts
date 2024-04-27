import { UserStatus } from "./UserStatus";

export class UserApiResponse {
    status: { [key: string]: UserStatus };
  
    constructor(status: { [key: string]: UserStatus }) {
      this.status = status;
    }
}