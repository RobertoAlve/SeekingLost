import { PersonResponse } from "./PersonResponse";

export class PersonApiResponse {
    status: { [key: string]: PersonResponse };
  
    constructor(status: { [key: string]: PersonResponse }) {
      this.status = status;
    }

    static fromError(error: any): PersonApiResponse {
      const errorMessage = error?.message || 'Erro desconhecido';
      const status: { [key: string]: PersonResponse } = {};
      for (const key in error?.error?.status) {
        if (Object.prototype.hasOwnProperty.call(error.error?.status, key)) {
          status[key] = {
            firstName: error.error?.status[key].firstName || errorMessage,
            lastName: error.error?.status[key].lastName || 500,
            birthDay: error.error?.status[key].birthDay,
            token: error.error?.status[key].token
          };
        }
      }
      return new PersonApiResponse(status);
    }
}