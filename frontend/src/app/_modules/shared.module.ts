import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import {
  QuizCardComponent,
  TabsComponent,
  TabComponent,
  RatingComponent,
  TestDirective,
  MatInputComponent,
  MatInputDirective,
  PaginationComponent,
  SortTableComponent
} from '@app/_directives';
import {
  AlertService,
  QuizService,
  SearchService
} from '@app/_services';
import { SortByPipe } from '@app/_pipes';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ModalModule.forRoot()
  ],
  declarations: [
    QuizCardComponent,
    TabsComponent,
    TabComponent,
    RatingComponent,
    TestDirective,
    MatInputComponent,
    MatInputDirective,
    PaginationComponent,
    SortByPipe,
    SortTableComponent
  ],
  exports: [
    FormsModule,
    QuizCardComponent,
    TabsComponent,
    TabComponent,
    RatingComponent,
    TestDirective,
    MatInputComponent,
    MatInputDirective,
    PaginationComponent,
    SortByPipe,
    SortTableComponent
  ],
  providers: [
    AlertService,
    QuizService,
    SearchService
  ]
})
export class SharedModule { }
