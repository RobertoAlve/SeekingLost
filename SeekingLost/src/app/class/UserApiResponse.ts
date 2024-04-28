import { UserStatus } from "./UserStatus";

export class UserApiResponse {
    status: { [key: string]: UserStatus };
  
    constructor(status: { [key: string]: UserStatus }) {
      this.status = status;
    }

    static fromError(error: any): UserApiResponse {
      const errorMessage = error?.message || 'Erro desconhecido';
      const status: { [key: string]: UserStatus } = {};
      for (const key in error?.error?.status) {
        if (Object.prototype.hasOwnProperty.call(error.error?.status, key)) {
          status[key] = {
            username: error.error?.status[key].username || errorMessage,
            statusCode: error.error?.status[key].statusCode || 500
          };
        }
      }
      return new UserApiResponse(status);
    }
}