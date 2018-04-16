import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FinishQuizComponent } from './core';
import { DashboardComponent } from './core/dashboard/dashboard.component';

import { GuardService } from '@app/_services';


const routes: Routes = [
  { path: '', component: DashboardComponent},
  { path: 'test', component: FinishQuizComponent},
  { path: 'user', loadChildren: './user/user.module#UserModule', canActivate: [ GuardService ]},
  { path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
