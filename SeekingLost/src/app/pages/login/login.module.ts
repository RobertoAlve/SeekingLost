import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { ButtonModule } from '../../components/button/button.module';
import { InputModule } from '../../components/input/input.module';
import { LogoModule } from '../../components/logo/logo.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    InputModule,
    LogoModule,
    ReactiveFormsModule
  ],
  exports: [
    LoginComponent
  ]
})
export class LoginModule { }
