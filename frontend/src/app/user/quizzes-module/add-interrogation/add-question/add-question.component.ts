import { Component, OnInit, Input, Output, EventEmitter, OnDestroy} from '@angular/core';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss']
})
export class AddQuestionComponent implements OnInit, OnDestroy {
  @Input() questions: any[];
  @Output() picked_question = new EventEmitter();
  @Output() removed_question = new EventEmitter();

  question_text: any = '';

  constructor() { }

  ngOnInit() {

  }
  ngOnDestroy() {

  }

  add_question(f) {
    this.questions.push({ text: this.question_text, answers: [] });
    f.reset();
  }
  // todo make it with dynamic forms
  pick_question(item, e) {
    const elem = e.target.tagName === 'LI' ? e.target : e.target.offsetParent;
    // todo remove active class and focus! document.onclick!!!!
    this.match_item(elem, e);
    if (e.target.tagName !== 'INPUT') {
      return;
    }
    this.picked_question.emit(item);
  }

  remove_question(item) {
    let ind = 0;
    this.questions.forEach( (el, index) => {
      if (el === item) {
        ind = index;
        return;
      }
    });
    this.questions.splice(ind, 1);
    this.removed_question.emit({item, deleted: true});
  }

  match_item(elem, e) {
    e.stopImmediatePropagation();
    const _li: any = document.querySelectorAll('.question_list li');
    for (let i = 0, x = _li.length; i < x; i++) {
      _li[i].classList.remove('cur');
      _li[i].children[0].disabled = true;
    }
    elem.classList.add('cur');
  }

  disable_inp (e) {
    const par = e.target,
          inp = par.children[0];
    inp.disabled = true ;
    par.classList.remove('edit');
    const edit_index = Array.from(par.parentNode.children).indexOf(par);
    this.questions[edit_index].text = par.children[0].value;
  }

  edit_question(e) {
    const _par = e.target.offsetParent,
            el: HTMLInputElement = _par.children[0];
    this.match_item(_par, e);
    if (el.disabled) {
      el.disabled = false;
      _par.classList.add('edit');
      el.focus();
    } else {
      _par.classList.remove('edit');
      el.disabled = true;
    }
  }
}
