import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { UserService } from './user.service';
import { SnackBarService } from './snack-bar.service';

@Injectable()

export class GuardService implements CanActivate {
  constructor(
    private userService: UserService,
    private snackBarService: SnackBarService
  ) {}

  canActivate() {
    const _st = this.userService.is_logged;
    if (!_st) {
      this.snackBarService.success('Please login');
      return false;
    }
    return true;
  }
}
