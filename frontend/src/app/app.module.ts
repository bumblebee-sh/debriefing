import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {
  DashboardComponent,
  HeaderComponent,
  InterrogationComponent,
  LoginComponent,
  RegisterComponent,
  FinishQuizComponent,
  DashboardFilterComponent
} from './core';

import {
  UserService,
  SnackBarService,
  GuardService,
  NotificationService
} from './_services';

import { SharedModule } from './_modules/shared.module';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { SnackBarComponent } from './_directives/snack-bar/snack-bar.component';
import { AlertComponent, NotificationComponent } from '@app/_directives';


@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BsDatepickerModule.forRoot(),
    SharedModule
  ],
  declarations: [
    AppComponent,
    AlertComponent,
    DashboardComponent,
    HeaderComponent,
    SnackBarComponent,
    LoginComponent,
    RegisterComponent,
    InterrogationComponent,
    FinishQuizComponent,
    DashboardFilterComponent,
    NotificationComponent
  ],
  entryComponents: [
    InterrogationComponent,
    AlertComponent,
    LoginComponent,
    RegisterComponent
  ],
  providers: [
    BsModalRef,
    UserService,
    SnackBarService,
    GuardService,
    NotificationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
