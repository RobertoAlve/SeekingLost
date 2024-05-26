import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeopleInfoComponent } from './people-info.component';
import { CardDefaultImageModule } from '../../components/card-default-image/card-default-image.module';
import { ButtonModule } from '../../components/button/button.module';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    PeopleInfoComponent
  ],
  imports: [
    CommonModule,
    CardDefaultImageModule,
    ButtonModule,
    MatIconModule
  ],
  exports: [
    PeopleInfoComponent
  ]
})
export class PeopleInfoModule { }
