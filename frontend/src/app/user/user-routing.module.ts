import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserComponent } from './user.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: '', component: UserComponent , children: [
    // { path: 'profile', component: ProfileComponent, data: { title: 'Profile' } },
    { path: 'profile', loadChildren: './profile-module/profile.module#ProfileModule', data: { title: 'Profile' }},
    { path: 'quizzes', loadChildren: './quizzes-module/quizzes.module#QuizzesModule', data: { title: 'Quizzes' }},
  ]},

];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class UserRoutingModule {}
