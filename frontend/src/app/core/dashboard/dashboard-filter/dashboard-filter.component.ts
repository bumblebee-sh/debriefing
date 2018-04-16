import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { SearchService } from '@app/_services';
import * as helpers from '@app/_helpers';
import { Location } from '@angular/common';

@Component({
  selector: 'app-dashboard-filter',
  templateUrl: './dashboard-filter.component.html',
  styleUrls: ['./dashboard-filter.component.scss']
})
export class DashboardFilterComponent implements OnInit {
  @Output() change_params = new EventEmitter();
  model = {
    rating: 0
  };

  constructor(
    private location: Location
  ) { }

  ngOnInit() {

  }

  search(f: HTMLFormElement) {
    window.location.hash = helpers.put_query({...helpers.parse_query(), ...this.model});
    this.change_params.emit();
  }
}
