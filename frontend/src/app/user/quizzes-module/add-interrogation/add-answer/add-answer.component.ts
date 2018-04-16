import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-add-answer',
  templateUrl: './add-answer.component.html',
  styleUrls: ['./add-answer.component.scss']
})
export class AddAnswerComponent implements OnInit {
  @Input() answers: any;
  constructor() { }

  ngOnInit() {
  }

  remove_answer(item) {
    let ind = 0;
    this.answers.forEach( (el, index) => {
      if (el === item) {
        ind = index;
        return;
      }
    });
    this.answers.splice(ind, 1);
  }

  disable_inp (e) {
    const par = e.target,
      inp = par.children[0];
    inp.disabled = true ;
    par.classList.remove('edit');

    const edit_index = Array.from(par.parentNode.children).indexOf(par);
    this.answers[edit_index].text = par.children[0].value;
  }

  edit_answer(e) {
    const _par = e.target.offsetParent,
          el: HTMLInputElement = _par.children[0];
    if (el.disabled) {
      el.disabled = false;
      _par.classList.add('edit');
      el.focus();
    } else {
      _par.classList.remove('edit');
      el.disabled = true;
    }
  }

  add_answer(f: HTMLFormElement, answer: string) {
    this.answers.push({text: answer});
    f.reset();
  }
}
