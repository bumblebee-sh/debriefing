import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PassedService } from '../../_services';

@Component({
  selector: 'app-quiz-detail',
  templateUrl: './quiz-detail.component.html',
  styleUrls: ['./quiz-detail.component.scss']
})
export class QuizDetailComponent implements OnInit {
  feedback_list: any = {};
  current_feedback: any;
  list_mode = true;
  constructor(
    private activatedRoute: ActivatedRoute,
    private passedService: PassedService
  ) { }

  ngOnInit() {
    this.passedService.get_passed(this.activatedRoute.snapshot.params.id).subscribe(
      (res: any) => {
        this.feedback_list = res;
      },
      err => console.log(err)
    );
  }

  pick_feedback(item: any) {
    this.current_feedback = item;
    this.toggle_mode();
  }

  toggle_mode = () => this.list_mode = !this.list_mode;

}
