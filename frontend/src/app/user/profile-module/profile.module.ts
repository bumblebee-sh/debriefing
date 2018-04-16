import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/_modules/shared.module';
import { ProfileComponent } from './';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileAsideComponent } from './profile-aside/profile-aside.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ProfileRoutingModule
  ],
  declarations: [
    ProfileComponent,
    ProfileAsideComponent
  ]
})

export class ProfileModule {}
