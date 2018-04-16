import { Component, OnInit, OnDestroy } from '@angular/core';
import { QuizService, UserService } from '@app/_services';
import { DeleteInterrogationComponent } from './delete-interrogation/delete-interrogation.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.scss']
})
export class QuizzesComponent implements OnInit, OnDestroy {
  add_question_mode = false;
  quiz_list: any;
  model: any;
  subscription: Subscription[] = [];
  order = 'viewed';
  type = 'number';
  reverse = true;

  constructor(
    private quizService: QuizService,
    private bsModalService: BsModalService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.get_quizzes_list();
  }

  ngOnDestroy() {
    this.clear_subscriptions();
  }

  edit_quiz(item) {
    this.model = item;
    this.change_mode();
  }

  add_quiz() {
    this.model = null;
    this.change_mode();
  }

  delete_quiz(item) {
    this.bsModalService.show(DeleteInterrogationComponent, {initialState : item});
  }

  get_quizzes_list() {
    const _req = this.quizService.get_quizzes(this.userService.user_data._id).subscribe(
      res => {
        this.quiz_list = res;
      },
      err => console.log(err)
    );
    this.subscription.push(_req);
  }

  change_mode() {
    this.add_question_mode = !this.add_question_mode;
  }

  sort_by(order: string, e, type: string = 'number') {
    this.order = order;
    this.reverse = !this.reverse;
    this.type = type;
    if (e) {
      const elem = e.target;
      if (!elem.classList.contains('active')) {
        Array.from(elem.parentNode.children).forEach( (el: HTMLElement) => el.classList.remove('active'));
        elem.classList.add('active');
      }
    }
  }

  clear_subscriptions(index?: number) {
    if (index !== undefined) {
      return this.subscription[index].unsubscribe();
    }
    this.subscription.forEach( (el: Subscription) => el.unsubscribe());
  }
}
