import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardDefaultImageComponent } from './card-default-image.component';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    CardDefaultImageComponent
  ],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: [
    CardDefaultImageComponent
  ]
})
export class CardDefaultImageModule { }
