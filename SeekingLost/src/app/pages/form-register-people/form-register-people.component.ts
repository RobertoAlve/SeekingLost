import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LostPerson } from '../../class/LostPerson';
import { User } from '../../class/User';
import { LostPersonService } from '../../services/lost-person/lost-person.service';
import { PersonApiResponse } from '../../class/PersonApiResponse';
import { ModalService } from '../../services/modal-service/modal-service.service';
import { TokenService } from '../../services/token-service/token.service';
import { ImageService } from '../../services/image-service/image.service';
import { ImageApiResponse } from '../../class/ImageApiResponse';

@Component({
  selector: 'app-form-register-people',
  templateUrl: './form-register-people.component.html',
  styleUrl: './form-register-people.component.scss'
})
export class FormRegisterPeopleComponent {
  importImage: boolean = false;
  hasImagesForUp: boolean = false;
  selectedFiles: File[] = [];
  registerForm: FormGroup;
  personToken: String = "";

  constructor(private formBuilder: FormBuilder, 
              private router: Router, 
              private lostPersonService: LostPersonService,
              private modalService: ModalService,
              private tokenService: TokenService,
              private imageService: ImageService) {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(5)]],
      lastName: ['', [Validators.required, Validators.minLength(5)]],
      birthDay: ['', Validators.required]
    });
  }

  ngOnInit(): void { }

  handleButtonClick(eventData: any) {
    if (eventData.id == "cancel") {
      this.cancelRegister();
    }

    if (eventData.id == "next") {
      this.registerPeople();
    }

    if (eventData.id == "sendImage") {
      this.uploadFiles();
    }
  }

  registerPeople(): void {
    var firstName = this.registerForm.get('firstName')?.value;
    var lastName = this.registerForm.get('lastName')?.value;
    var birthDay = this.registerForm.get('birthDay')?.value;
    this.personToken = this.tokenService.generateToken();

    if (this.personToken == null || this.personToken == "") {
      this.modalService.openAlertModal(
        "Error", 
        "Token para a pessoa não criado!",
        "danger"
      )
      return;
    }

    var userId = sessionStorage.getItem('userId');
    console.log(userId);

    if (userId != null) {
      var person = new LostPerson(firstName, lastName, birthDay, this.personToken, new User(userId, ""));

      this.lostPersonService.createLostPerson(person).subscribe({
        next: (data: PersonApiResponse) => {
          this.modalService.openAlertModal(
            "Sucesso",
            "Pessoa cadastrada com sucesso!",
            "success"
          )
          
          this.importImage = true;
        },
        error: (error: any) => {
          const response = PersonApiResponse.fromError(error);
          var status;
          var message = "Erro ao cadastrar!"

          for (const key in response.status) {
            if (Object.prototype.hasOwnProperty.call(response.status, key)) {
              status = response.status[key];
            }
          }

          this.modalService.openAlertModal(
            "Error", 
            message,
            "danger"
          )
        }
      });
    } else {
      this.modalService.openAlertModal(
        "Error", 
        "Error in register!",
        "danger"
      )
    }
  }

  cancelRegister(): void {
    this.importImage = false;
    this.hasImagesForUp = false;
    this.selectedFiles = [];
    this.clearForm();
    
    this.router.navigate(['/register-lost-people']);
  }

  clearForm(): void {
    this.registerForm.reset({
      firstName: '',
      lastName: '',
      birthDay: ''
    });
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

    this.imageService.saveImages(this.selectedFiles, this.personToken).subscribe({
      next: (data: any) => {
        this.modalService.openAlertModal(
          "Sucesso",
          "Fotos cadastradas com sucesso!",
          "success"
        )
        
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

        this.modalService.openAlertModal(
          "Error", 
          message,
          "danger"
        )
      }
    });
  }
  
  getFormProgress(): number {
    const totalFields = Object.keys(this.registerForm.controls).length;
    const filledFields = Object.keys(this.registerForm.controls)
                           .filter(field => this.registerForm.controls[field].value !== '')
                           .length;
    return (filledFields / totalFields) * 100;
  }
}
