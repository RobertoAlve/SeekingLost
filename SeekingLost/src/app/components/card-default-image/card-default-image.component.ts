import { Component, Input } from '@angular/core'
import { ImageService } from '../../services/image-service/image.service';
import { ImageApiResponse } from '../../class/ImageApiResponse';
import { ModalService } from '../../services/modal-service/modal-service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-card-default-image',
  templateUrl: './card-default-image.component.html',
  styleUrl: './card-default-image.component.scss'
})
export class CardDefaultImageComponent {
  @Input() imagePath: string = "";
  @Input() newImage: boolean = false;
  @Input() delete: boolean = true;

  constructor(private imageService: ImageService, 
              private modalService: ModalService,
              private http: HttpClient) { }

  deleteImage() {
    this.imageService.deleteImage(this.imagePath).subscribe({
      next: (data: ImageApiResponse) => {
        this.modalService.openAlertModal(
          "Sucesso",
          "Imagem excluida!",
          "success"
        )
        window.location.reload();
      },
      error: (error: any) => {
        const errorResponse = ImageApiResponse.fromError(error);
        let ImageResponse;

        for (const key in errorResponse.status) {
          if (Object.prototype.hasOwnProperty.call(errorResponse.status, key)) {
            const imageStatus = errorResponse.status[key];
            ImageResponse = imageStatus.message;
          }
        }

        this.modalService.openAlertModal(
          "Error",
          "Erro ao deletar imagem!",
          "danger"
        )
      }
    });
  }

  downloadImage(url: string): void {
    if (this.delete == false && this.newImage == false) {
      this.http.get(url, { responseType: 'blob' }).subscribe((blob: Blob) => {
        const a = document.createElement('a');
        const objectUrl = URL.createObjectURL(blob);
        a.href = objectUrl;
        a.download = 'image-result.jpg';
        a.click();
        URL.revokeObjectURL(objectUrl);
      }, error => {
        console.error('Download error:', error);
      });
    }
  }
}
