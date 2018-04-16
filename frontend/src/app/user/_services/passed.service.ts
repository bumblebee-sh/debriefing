import { Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@env/environment';

import { tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Injectable()

export class PassedService {
  host = environment.host + 'quiz/';

  constructor(
    private http: HttpClient
  ) {}

  get_passed(id: string) {
    return this.http.get(this.host + 'passed/' + id);
  }
}
