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
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AboutModule } from './pages/about/about.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ModalModule as ModalAlertModule } from './components/modal/shared.module';
import { LoadingInterceptor } from './loading.interceptor';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { PeopleInfoModule } from './pages/people-info/people-info.module';

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    CadastroModule,
    HomeModule,
    AboutModule,
    RegisterLostPeopleModule,
    FormRegisterPeopleModule,
    PeopleInfoModule,
    HeaderModule,
    FooterModule,
    HttpClientModule,
    ModalAlertModule,
    ModalModule.forRoot()
  ],
  providers: [
    provideClientHydration(),
    {
      provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
