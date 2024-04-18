import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input.component';
import { FormsModule } from '@angular/forms'
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    InputComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule
  ],
  exports: [
    InputComponent
  ]
})
export class InputModule { }
