import { Injectable } from '@angular/core';
import { IImageService } from '../../interfaces/iimage-service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environments';
import { ImageApiResponse } from '../../class/ImageApiResponse';

@Injectable({
  providedIn: 'root'
})
export class ImageService implements IImageService {
  private environment = environment;
  private finalEndpoint = environment.API_ENDPOINT + "/image"
  private finalEndpointPy = environment.API_PYTHON + "/predict"

  httpOptions = {
    headers: new HttpHeaders(
      { 
        'Content-Type': 'multipart/form-data', 
      }
    ),
  }

  constructor(private httpClient: HttpClient) { }

  getFirstImage(token: String): Observable<String> {
    return this.httpClient.get<String>(this.finalEndpoint + "/" + token);
  }

  getAllImages(token: String): Observable<String[]> {
    return this.httpClient.get<String[]>(this.finalEndpoint + "/all-images" + "/" + token);
  }

  getResults(token: String): Observable<String[]> {
    return this.httpClient.get<String[]>(this.finalEndpoint + "/results" + "/" + token);
  }

  predictPeople(token: String): Observable<any> {
    return this.httpClient.get<any>(this.finalEndpointPy + "/" + token);
  }

  saveImages(files: File[], token: String): Observable<ImageApiResponse> {
    const formData = new FormData()

    files.forEach(file => {
      formData.append('files', file);
    });

    return this.httpClient.post<ImageApiResponse>(this.finalEndpoint + "/upload/" + token, formData);
  }

  deleteImage(uri: string): Observable<ImageApiResponse> {
    console.log("Oiii")
    return this.httpClient.delete<ImageApiResponse>(this.finalEndpoint,  { params: { uri } });
  }
}
