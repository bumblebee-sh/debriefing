import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';

import { RegisterComponent } from '../register/register.component';
import { UserService, SnackBarService } from '@app/_services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  model: any = {};
  err = false;
  constructor(
    private bsModalService: BsModalService,
    private userService: UserService,
    private router: Router,
    public bsModalRef: BsModalRef,
    public snackBarService: SnackBarService
  ) { }

  ngOnInit() {
  }

  sign_in() {
    this.err = false;
    this.userService.login(this.model).subscribe(
      (res: any) => {
        this.bsModalRef.hide();
        this.snackBarService.success(`Hello <b>${res.name}</b>.`);
        this.router.navigateByUrl(`/user/quizzes`);
      },
      err => this.err = true
    );
  }

  sign_up() {
    this.bsModalRef.hide();
    this.bsModalService.show(RegisterComponent);
  }
}
