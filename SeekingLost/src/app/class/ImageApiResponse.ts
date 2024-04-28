import { ImageResponse } from "./ImageResponse";

export class ImageApiResponse {
    status: { [key: string]: ImageResponse };

    constructor(status: { [key: string]: ImageResponse }) {
        this.status = status;
    }
  
    static fromError(error: any): ImageApiResponse {
        const errorMessage = error?.message || 'Erro desconhecido';
        const status: { [key: string]: ImageResponse } = {};

        for (const key in error?.error?.status) {
            if (Object.prototype.hasOwnProperty.call(error.error?.status, key)) {
                status[key] = {
                    message: error.error?.status[key].message || errorMessage
                };
            }
        }
    
        return new ImageApiResponse(status);
    }
}