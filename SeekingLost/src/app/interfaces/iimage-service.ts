import { Observable } from "rxjs";
import { ImageApiResponse } from "../class/ImageApiResponse";

export interface IImageService {

    saveImages(files: File[], token: String): Observable<ImageApiResponse>;

    getFirstImage(token: String): Observable<String>;

    getAllImages(token: String): Observable<String[]>;

    deleteImage(uri: string): Observable<ImageApiResponse>;
}