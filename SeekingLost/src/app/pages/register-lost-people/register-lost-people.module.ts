import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterLostPeopleComponent } from './register-lost-people.component';
import { PeopleCardModule } from '../../components/people-card/people-card.module';



@NgModule({
  declarations: [
    RegisterLostPeopleComponent
  ],
  imports: [
    CommonModule,
    PeopleCardModule
  ],
  exports: [
    RegisterLostPeopleComponent
  ]
})
export class RegisterLostPeopleModule { }
