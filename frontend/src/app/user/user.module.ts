import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../_modules/shared.module';
import { PassedService } from './_services';

import { UserComponent } from './user.component';
import { UserAsideComponent } from './user-aside/user-aside.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileViewComponent } from './profile/profile-view/profile-view.component';
import { ProfileSettingsComponent } from './profile/profile-settings/profile-settings.component';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ProfileQuizzesComponent } from './profile/profile-quizzes/profile-quizzes.component';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    BsDatepickerModule.forRoot()
  ],
  declarations: [
    UserComponent,
    UserAsideComponent,
    ProfileComponent,
    ProfileViewComponent,
    ProfileSettingsComponent,
    ProfileQuizzesComponent
  ],
  providers: [
    PassedService
  ]
})
export class UserModule { }
