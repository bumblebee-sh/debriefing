import {Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import * as helpers from '@app/_helpers';
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() pages_counter: number;
  @Input() default_options: any;
  @Output() change_params = new EventEmitter();
  page_counter: [number] = [5, 10, 15, 20];
  all_pages: any[];
  page: any;
  model: any = {};
  constructor() {}

  ngOnInit() {
    this.model.limit = this.default_options.limit || this.page_counter[0];
    this.model.page = this.default_options.page - 1 || 0;
    this.all_pages = this.calc_pages(this.pages_counter, this.model.limit);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.pages_counter.previousValue !== changes.pages_counter.currentValue && !changes.pages_counter.firstChange) {
      this.all_pages = this.calc_pages(+changes.pages_counter.currentValue, this.model.limit);
    }
  }

  calc_pages(all, viewed) {
    return new Array(Math.ceil(all / viewed)).fill(0);
  }

  change_param() {
    this.all_pages = this.calc_pages(+this.pages_counter, +this.model.limit);
    if (this.all_pages.length - 1 < this.model.page) {
      this.model.page = this.all_pages.length - 1;
    }
    this.load_new_data();
  }

  change_page(way: boolean) {
    this.model.page = way ? ++this.model.page : --this.model.page ;
    this.load_new_data();
  }

  load_new_data = () => {
    const data = {
      page: this.model.page + 1,
      limit: this.model.limit
    };
    // todo data.page  === 'string' => error Fix it in helpers
    window.location.hash = helpers.put_query({...helpers.parse_query(), ...data});
    this.change_params.emit();
  }
}
