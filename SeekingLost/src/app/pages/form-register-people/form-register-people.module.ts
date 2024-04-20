import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormRegisterPeopleComponent } from './form-register-people.component';
import { ButtonModule } from '../../components/button/button.module';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    FormRegisterPeopleComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  exports: [
    FormRegisterPeopleComponent
  ]
})
export class FormRegisterPeopleModule { }
