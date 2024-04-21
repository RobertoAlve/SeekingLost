import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './pages/login/login.module';
import { CadastroModule } from './pages/cadastro/cadastro.module';
import { HomeModule } from './pages/home/home.module';
import { RegisterLostPeopleModule } from './pages/register-lost-people/register-lost-people.module';
import { HeaderModule } from './components/header/header.module';
import { FooterModule } from './components/footer/footer.module';
import { FormRegisterPeopleModule } from './pages/form-register-people/form-register-people.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    CadastroModule,
    HomeModule,
    RegisterLostPeopleModule,
    FormRegisterPeopleModule,
    HeaderModule,
    FooterModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
