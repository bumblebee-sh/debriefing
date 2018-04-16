import { Component, OnInit } from '@angular/core';
import { QuizCardModel } from '@app/_models/quiz-card.model';
import { QuizService, SearchService } from '@app/_services';
import { ActivatedRoute } from '@angular/router';

import { parse_query } from '@app/_helpers';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  // interrogations: QuizCardModel[];
  interrogations: any = [];
  pages_counter: number;
  def_param: any = {};

  constructor(
    private quizService: QuizService,
    private searchService: SearchService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    if (window.location.hash && window.location.hash.indexOf('page') + 1 && window.location.hash.indexOf('limit') + 1) {
      const data: any = parse_query();
      this.def_param.page = data.page;
      this.def_param.limit = data.limit;
      this.load_data();
    } else {
      this.quizService.get_all_quizzes().subscribe(
        res => {
          this.interrogations = res.items;
          this.pages_counter = res.count;
        },
        err => console.log(err)
      );
    }
  }

  load_data() {
    this.searchService.search().subscribe(
      (res: any) => {
        this.interrogations = res.items;
        this.pages_counter = res.count;
      },
      err => console.log(err)
    );
  }
}
