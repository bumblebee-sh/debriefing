import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-finish-quiz',
  templateUrl: './finish-quiz.component.html',
  styleUrls: ['./finish-quiz.component.scss']
})
export class FinishQuizComponent implements OnInit {
  @Output() send_data = new EventEmitter();
  model: any = {};
  constructor() { }

  ngOnInit() {
  }

  send(f: HTMLFormElement) {
    this.send_data.emit(this.model);
  }
}
