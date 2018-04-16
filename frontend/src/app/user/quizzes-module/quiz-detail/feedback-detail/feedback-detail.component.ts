import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-feedback-detail',
  templateUrl: './feedback-detail.component.html',
  styleUrls: ['./feedback-detail.component.scss']
})
export class FeedbackDetailComponent implements OnInit {
  @Input() feedback_info: any;
  @Output() go_back = new EventEmitter();
  constructor() { }

  ngOnInit() {

  }

  back = () => this.go_back.emit();
}
