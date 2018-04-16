import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { NewUserModel } from '@app/_models/new-user.model';

import { UserService, SnackBarService} from '@app/_services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  model: NewUserModel = <NewUserModel>{};
  constructor(
    private userService: UserService,
    public bsModalRef: BsModalRef,
    public snackBarService: SnackBarService
  ) { }

  ngOnInit() {
  }

  register(f: HTMLFormElement) {
    let data = {...this.model};
    data.birthday = new Date(data.birthday).getTime();
    this.userService.register(data).subscribe(
      (res: NewUserModel) => {
        this.bsModalRef.hide();
        this.snackBarService.success(`Thank you <b>${res.name}</b>`);
        f.reset();
      },
      err => {
        this.snackBarService.err(`This email is taken!`);
      }
    );
  }
}
