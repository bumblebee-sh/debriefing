import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';

@Injectable()

export class SnackBarService {
  private subject = new Subject<any>();

  constructor() {}

  success(mes: string) {
    this.subject.next({mes: mes});
  }

  err(mes: string) {
    this.subject.next({mes : mes, err: true});
  }

  getSnackBar() {
    return this.subject.asObservable();
  }
}
