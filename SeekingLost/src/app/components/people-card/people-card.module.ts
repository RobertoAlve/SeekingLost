import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeopleCardComponent } from './people-card.component';



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
