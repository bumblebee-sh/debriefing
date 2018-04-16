import { Component, OnInit, Input } from '@angular/core';
import {QuizCardModel} from '@app/_models';
import {QuizService} from '@app/_services';
import { InterrogationComponent } from '@app/core/interrogation/interrogation.component';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-quiz-card',
  templateUrl: './quiz-card.component.html',
  styleUrls: ['./quiz-card.component.scss']
})

export class QuizCardComponent implements OnInit {
  @Input() card: any;
  @Input() current_quiz: any;
  @Input() preview: boolean;

  subscription: Subscription;

  constructor(
    private modalService: BsModalService,
    private quizService: QuizService
  ) { }

  ngOnInit() {
  }

  reset_quiz(quiz) {
    return quiz.map(el => {
      el.passed_time = 0;
      el.answers.forEach(elem => elem.status = false);
      return el;
    });
  }

  take_interrogation() {
    const initialState = {
      quiz: this.reset_quiz(this.current_quiz),
      id: this.card._id
    };
    const interrogationComponent = this.modalService.show(InterrogationComponent, {initialState});
    this.subscription = this.modalService.onHide.subscribe( _ => {
      const card_model = interrogationComponent.content.card_model;
      if (card_model) {
        this.card =  card_model;
      } else {
        this.card.viewed++;

        const data = {
          id: this.card._id,
          viewed: this.card.viewed
        };

        this.quizService.update_viewed(data).subscribe(
          res => {},
          err => console.log(err)
        );
      }
      this.card.questions.forEach( el => {
        el.answers.forEach( answer => answer.status = false);
      });
      this.subscription.unsubscribe();
    });
  }
}
