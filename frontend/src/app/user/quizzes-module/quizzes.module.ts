import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/_modules/shared.module';
import {
  QuizzesComponent,
  AddInterrogationComponent,
  AddAnswerComponent,
  AddQuestionComponent,
  DeleteInterrogationComponent,
  QuizDetailComponent,
  FeedbackDetailComponent
} from './';
import { QuizzesRoutingModule } from './quizzes-routing.module';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    QuizzesRoutingModule
  ],
  declarations: [
    QuizzesComponent,
    AddInterrogationComponent,
    AddAnswerComponent,
    AddQuestionComponent,
    DeleteInterrogationComponent,
    QuizDetailComponent,
    FeedbackDetailComponent
  ],
  entryComponents: [
    DeleteInterrogationComponent
  ]
})

export class QuizzesModule {}
