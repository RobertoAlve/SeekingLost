import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { clear } from 'console';

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

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
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
  }

  registerPeople(): void {
    this.importImage = true;
    console.log(this.registerForm.get('firstName')?.value)
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
      this.uploadFiles();
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
      this.uploadFiles();
    }
  }

  uploadFiles(): void {
    if (!this.selectedFiles || this.selectedFiles.length === 0) {
      return;
    }

    const formData = new FormData();
    this.selectedFiles.forEach(file => {
      formData.append('files', file);
    });

    console.log('Arquivos selecionados:', this.selectedFiles);
  }
  
  getFormProgress(): number {
    const totalFields = Object.keys(this.registerForm.controls).length;
    const filledFields = Object.keys(this.registerForm.controls)
                           .filter(field => this.registerForm.controls[field].value !== '')
                           .length;
    return (filledFields / totalFields) * 100;
  }
}
