import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuizzesComponent, QuizDetailComponent } from './';

const routes: Routes = [
  { path: '', component: QuizzesComponent},
  { path: 'test', component: QuizzesComponent},
  { path: 'detail/:id', component: QuizDetailComponent},
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizzesRoutingModule { }
