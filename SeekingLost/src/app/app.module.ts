import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
<<<<<<< Updated upstream
import { ButtonModule } from './components/button/button.module';
=======
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LoginModule } from './pages/login/login.module';
import { RegisterLostPeopleModule } from './pages/register-lost-people/register-lost-people.module';
>>>>>>> Stashed changes

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
<<<<<<< Updated upstream
    ButtonModule
=======
    LoginModule,
    RegisterLostPeopleModule
>>>>>>> Stashed changes
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
