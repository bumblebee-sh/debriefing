import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@env/environment';

import { tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()

export class QuizService {
  host = environment.host;
  quizzes$: ReplaySubject<any> = new ReplaySubject(0);
  all_quizzes = null;
  constructor(
    private http: HttpClient
  ) {}

  add_quiz(data) {
    return this.http.post( this.host + 'quiz', data, {withCredentials : true}).pipe(
      tap(quizzes => {
        this.set_quizzes$(quizzes);
      })
    );
  }

  edit_quiz(data) {
    return this.http.put( this.host + 'quiz', data, {withCredentials : true}).pipe(
      tap(quizzes => this.set_quizzes$(quizzes))
    );
  }

  delete_quiz(id) {
    return this.http.delete(this.host + 'quiz/' + id, {withCredentials: true}).pipe(
      tap(quizzes => this.set_quizzes$(quizzes))
    );
  }

  get_quizzes(id, refresh?: boolean) {
    if (!this.quizzes$.observers.length || refresh) {
      this.http.get( this.host + 'quiz/' + id).subscribe(
        res => this.set_quizzes$(res),
        err => console.log(err)
      );
    }
    return this.quizzes$;
  }

  get_all_quizzes() {
    if (this.all_quizzes) {
      return of(this.all_quizzes);
    } else {
      return this.http.get( this.host + 'quiz').pipe(
        tap(quizzes => this.all_quizzes = quizzes)
      );
    }
  }

  update_viewed(data: object) {
    return this.http.put( this.host + 'quiz/result', data);
  }

  save_result(data) {
    return this.http.post( this.host + 'quiz/result', data);
  }

  clear_cache = () => {
    this.quizzes$ = new ReplaySubject(0);
    this.quizzes$.next(null);
  }

  set_quizzes$ = data => this.quizzes$.next(data);

}
