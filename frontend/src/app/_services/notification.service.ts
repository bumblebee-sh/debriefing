import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

import { catchError, map, tap } from 'rxjs/operators';

import { Subject } from 'rxjs/Subject';

import { UserService } from './user.service';
import { SnackBarService } from './snack-bar.service';

declare const io: any;

@Injectable()

export class NotificationService {
  private notification = new Subject<any>();
  host = environment.host;

  constructor(
    private userService: UserService
  ) {}

  init() {
    const socket = io('http://localhost:3000', {
      path: '/notification'
    });
    socket.emit('user id', this.userService.user_data._id);
    socket.on('message', data => {
      console.log(data);
      this.show_notification(`${data.item.title} was passed.`);
    });
  }

  show_notification(data) {
    console.warn(data);
    this.notification.next(data);
  }

  get_notification() {
    return this.notification.asObservable();
  }

}
