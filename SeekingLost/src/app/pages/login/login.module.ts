import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { ButtonModule } from '../../components/button/button.module';
import { InputModule } from '../../components/input/input.module';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    InputModule
  ],
  exports: [
    LoginComponent
  ]
})
export class LoginModule { }
