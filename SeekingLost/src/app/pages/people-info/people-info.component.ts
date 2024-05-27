import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { ImageService } from '../../services/image-service/image.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageApiResponse } from '../../class/ImageApiResponse';
import { ModalService } from '../../services/modal-service/modal-service.service';

@Component({
  selector: 'app-people-info',
  templateUrl: './people-info.component.html',
  styleUrl: './people-info.component.scss'
})
export class PeopleInfoComponent implements OnInit {
  @Input() peopleName: string = "";
  @Input() token: string = "";

  hasImagesForUp: boolean = false;
  selectedFiles: File[] = [];

  imagePath: String[] = [];
  imagesPeople: String[] = [];
  resultsPeople: String[] = [];
  changeView: boolean = false;
  uploadImages: boolean = false;

  constructor(private imageService: ImageService, 
              private route: ActivatedRoute, 
              private renderer: Renderer2,
              private router: Router,
              private modalServive: ModalService) 
  { }

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation != null) {
      const state = navigation.extras.state as { peopleName: string, token: string };
      if (state) {
        this.peopleName = state.peopleName;
        this.token = state.token;
        console.log(this.peopleName)
      }
    }

    this.imageService.getFirstImage(this.token).subscribe({
      next: (data: any) => {
        this.imagePath = data.uris;
      },
      error: (error: any) => {
        console.error(error);
      }
    });
    
    this.imageService.getAllImages(this.token).subscribe({
      next: (data: any) => {
        this.imagesPeople = data.uris;
        console.log(this.imagesPeople)
      },
      error: (error: any) => {
        console.error(error);
      }
    });

    this.imageService.getResults(this.token).subscribe({
      next: (data: any) => {
        this.resultsPeople = data.uris;
        console.log(this.resultsPeople[0])
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

  handleClick(event: Event) {
    const target = event.target as HTMLElement;
    const parent = target.parentElement;

    if (parent) {
      const children = parent.children;
      for (let i = 0; i < children.length; i++) {
        this.renderer.removeClass(children[i], 'active');
      }

      if (target.textContent?.toLocaleLowerCase().includes("resultados")) {
        this.changeView = true;
      } else {
        this.changeView = false;
      }
      
      this.uploadImages = false;
      this.renderer.addClass(target, 'active');
    }
  }

  handleButtonClick(eventData: any) {
    if (eventData.id == "cancel") {
      this.uploadImages = false;
      this.changeView = false;
      this.router.navigate(['/register-lost-people/people-info'], { state: { peopleName: this.peopleName, token: this.token } });
    }

    if (eventData.id == "sendImage") {
      this.uploadFiles();
    }
  }

  triggerInput(): void {
    const inputElement = document.getElementById('file-input');
    if (inputElement) {
      inputElement.click();
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    const dataTransfer = event.dataTransfer;

    if (dataTransfer && dataTransfer.files) {
      const files = dataTransfer.files;
      const imageFiles = this.filterImageFiles(files);
      var filesUp = Array.from(imageFiles) as File[];

      filesUp.forEach(file => {
        this.selectedFiles.push(file)
      })

      this.hasImagesForUp = true;
    }
  }

  filterImageFiles(files: FileList): File[] {
    const imageFiles: File[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.startsWith('image/')) {
        imageFiles.push(file);
      }
    }

    return imageFiles;
  }

  onFilesSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;

    if (inputElement.files instanceof FileList) {
      var files = Array.from(inputElement.files) as File[];

      files.forEach(file => {
        this.selectedFiles.push(file)
      })

      this.hasImagesForUp = true;
    }
  }

  uploadFiles(): void {
    if (!this.selectedFiles || this.selectedFiles.length === 0) {
      return;
    }

    this.imageService.saveImages(this.selectedFiles, this.token).subscribe({
      next: (data: any) => {
        this.modalServive.openAlertModal(
          "Sucesso",
          "Fotos cadastradas com sucesso!",
          "success"
        )

        this.uploadImages = false;
        this.changeView = false;
        
        this.imageService.predictPeople(this.token).subscribe({
          next: (data: any) => {
            console.log("Predict disparado")
          },
          error: (error: any) => {
            console.log("Predict error: " + error)
          }
        });

        this.router.navigate(['/register-lost-people']);
      },
      error: (error: any) => {
        console.log(error)
        const response = ImageApiResponse.fromError(error);
        var status;
        var message = "Erro ao cadastrar imagens!"

        for (const key in response.status) {
          if (Object.prototype.hasOwnProperty.call(response.status, key)) {
            status = response.status[key];
          }
        }

        this.modalServive.openAlertModal(
          "Error", 
          message,
          "danger"
        )
      }
    });
  }

  uploadImage() {
    this.changeView = true;
    this.uploadImages = true;
  }
}
