import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { BsModalService } from 'ngx-bootstrap/modal';

import { LoginComponent } from '../login/login.component';
import { UserService, SnackBarService, QuizService, NotificationService } from '@app/_services';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  user: any;
  subs: Subscription;
  constructor(
    private bsModalService: BsModalService,
    private userService: UserService,
    private snackBarService: SnackBarService,
    private quizService: QuizService,
    private notificationService: NotificationService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.check_session();
  }

  sign_in() {
    this.bsModalService.show(LoginComponent, { class: 'modal-sm' });
    this.subs = this.bsModalService.onHidden.subscribe((reason: string) => {
      this.subs.unsubscribe();
      this.check_session();
    });
  }

  drop() {
    this.userService.drop().subscribe(
      res => console.log(res),
      err => console.log(err)
    );
  }

  logout() {
    this.userService.logout().subscribe(
      (res: any) => {
        this.snackBarService.success(`Goodbye ${res.name}.`);
        this.user = null;
        this.router.navigateByUrl('/');
      },
      err => console.log(err)
    );
  }

  check_session() {
    this.userService.check_session().subscribe(
      (res: any) => {
        this.user = res.user;
        this.notificationService.init();
      },
      err => console.log(err)
    );
  }
}
