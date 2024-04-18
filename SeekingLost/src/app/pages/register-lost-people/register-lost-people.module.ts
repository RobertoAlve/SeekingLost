import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterLostPeopleComponent } from './register-lost-people.component';
import { HeaderModule } from '../../components/header/header.module';
import { PeopleCardModule } from '../../components/people-card/people-card.module';
import { FooterModule } from '../../components/footer/footer.module';



@NgModule({
  declarations: [
    RegisterLostPeopleComponent
  ],
  imports: [
    CommonModule,
    HeaderModule,
    FooterModule,
    PeopleCardModule
  ],
  exports: [
    RegisterLostPeopleComponent
  ]
})
export class RegisterLostPeopleModule { }
