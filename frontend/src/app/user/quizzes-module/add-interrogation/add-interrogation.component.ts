import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';

import {QuizCardModel} from '@app/_models/quiz-card.model';

import { AlertService, QuizService, SnackBarService } from '@app/_services';

@Component({
  selector: 'app-add-interrogation',
  templateUrl: './add-interrogation.component.html',
  styleUrls: ['./add-interrogation.component.scss']
})

export class AddInterrogationComponent implements OnInit {
  @Output() to_quiz_list = new EventEmitter();
  @Input() model: any;
  image: any;
  img_text = 'Choose file...';
  img_err = false;
  picked = null;
  add_answers_mode = false;
  question_err = false;
  edit_mode = false;
  url_part: any;
  default_state: any = {
    image: './assets/no_image.png',
    questions: []
  };

  constructor(
    private alertService: AlertService,
    private quizService: QuizService,
    private router: Router,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit() {
    this.url_part = this.router.url.replace('interrogations', '');
    if (!this.model) {
      this.model = {...this.default_state};
      return;
    }
    this.edit_mode = true;
  }

  back() {
    this.to_quiz_list.emit(true);
  }

  save(f: HTMLFormElement) {
    if (!this.model.questions.length) {
      this.question_err = true;
    }
    this.model.questions.forEach(el => {
      if (!el.answers.length) {
        this.question_err = true;
      }
    });
    if (this.question_err) {
      return;
    }
    if (this.edit_mode) {
      this.quizService.edit_quiz(this.model).subscribe(
        res => {
          this.snackBarService.success('Edited');
        },
        err => console.log(err)
      );
      return;
    }
    console.log(this.model);
    this.quizService.add_quiz(this.model).subscribe(
      res => {
        this.alertService.success('Quiz is saved!');
        this.model = {
          image: './assets/no_image.png',
          questions: []
        };
        this.picked = null;
        f.reset();
      },
      err => console.log(err)
    );
  }

  image_pick(e) {
    this.img_err = false;
    const file = e.target.files[0];
    if (file.size > 1e+6) {
      this.img_err = true;
      return;
    }
    this.img_text = file.name;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = event => {
      this.model.image = event.target['result'];
    };
  }

  pick_one(e) {
    if (e.deleted) {
      if (e.item === this.picked) {
        this.picked = null;
      }
      return;
    }
    this.picked = e;
  }

  answer_mode() {
    this.add_answers_mode = true;
    this.question_err = false;
  }
}
