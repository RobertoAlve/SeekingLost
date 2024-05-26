import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeopleCardComponent } from './people-card.component';
import { CardDefaultImageModule } from '../card-default-image/card-default-image.module';



@NgModule({
  declarations: [
    PeopleCardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PeopleCardComponent
  ]
})
export class PeopleCardModule { }
