import { Component, OnInit, OnDestroy } from '@angular/core';

import { AlertService, QuizService } from '@app/_services';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-interrogation',
  templateUrl: './interrogation.component.html',
  styleUrls: ['./interrogation.component.scss']
})
export class InterrogationComponent implements OnInit, OnDestroy {
  model: any = {};
  step = 0;
  step_err = false;
  quiz: any;
  id: any;
  card_model: any;
  start_time = 0;
  constructor(
    public alertService: AlertService,
    public bsModalRef: BsModalRef,
    public quizService: QuizService,
  ) { }

  ngOnInit() {
    this.answer_timer(0);
  }

  ngOnDestroy() {
    this.start_time = 0;
  }

  pick_it(answer) {
    answer.status = !answer.status;
    this.step_err = false;
  }

  prev_question() {
    this.step_err = false;
    this.step--;
  }

  next_question() {
    this.step_err = false;
    this.check_step() ? this.step++ : this.step_err = true ;
    if (!this.step_err) {
       this.answer_timer(this.step - 1);
    }
  }

  check_step = () => this.quiz[this.step].answers.some(el => el.status === true );

  answer_timer(step) {
    const current = Date.now();
    if (!this.start_time) {
      this.start_time = current;
      return;
    }
    const _res = current - this.start_time;
    !this.quiz[step].passed_time ? this.quiz[step].passed_time = _res : this.quiz[step].passed_time += _res;
    this.start_time = Date.now();
  }

  save_qiuz(model) {
    const data  = {
      answers: this.quiz,
      id: this.id,
      ...model
    };
    this.quizService.save_result(data).subscribe(
      (res: any) => {
        this.card_model = res;
        this.bsModalRef.hide();
        this.alertService.success('Thank you, <b>' + model.name + '</b>. Your result is saved.');
      },
      err => console.log(err)
    );
  }
}
