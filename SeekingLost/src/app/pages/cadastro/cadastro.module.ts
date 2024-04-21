import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastroComponent } from './cadastro.component';
import { LogoModule } from '../../components/logo/logo.module';
import { InputModule } from '../../components/input/input.module';
import { ButtonModule } from '../../components/button/button.module';


@NgModule({
  declarations: [
    CadastroComponent
  ],
  imports: [
    CommonModule,
    LogoModule,
    InputModule,
    ButtonModule
  ],
  exports: [
    CadastroComponent
  ]
})
export class CadastroModule { }
