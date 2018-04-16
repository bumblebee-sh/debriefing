import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { NewUserModel } from '../_models';
import { catchError, map, tap } from 'rxjs/operators';
import { QuizService } from './quiz.service';

import { of } from 'rxjs/observable/of';

@Injectable()

export class UserService {
  host = environment.host;
  public is_logged = null;
  constructor(
    private http: HttpClient,
    private quizService: QuizService
  ) {}

  drop() {
    return this.http.get(this.host + 'drop');
  }

  register(data: NewUserModel) {
    return this.http.post( this.host + 'registration', data);
  }

  login(data) {
    // this.quizService.clear_state = null;
    return this.http.post( this.host + 'login', data, {withCredentials: true}).pipe(
      tap( session => {
        if ( session ) {
          this.is_logged = session;
        }
      })
    );
  }

  logout() {
    this.is_logged = null;
    this.quizService.clear_cache();
    return this.http.get( this.host + 'logout', { withCredentials: true });
  }

  check_session() {
    return this.http.get( this.host + 'check_session', {withCredentials: true}).pipe(
      tap((session: any) => {
        if (session.user) {
          this.is_logged = session.user;
        }
      })
    );
  }

  get user_data() {
    return this.is_logged;
  }

  set set_user_data(data) {
    this.is_logged = data;
  }

  update_profile(data: any) {
    return this.http.put( this.host + 'user', data, {withCredentials: true});
  }
}
