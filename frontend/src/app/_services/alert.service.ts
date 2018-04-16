import { Injectable } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';

import {AlertComponent} from '../_directives/alert/alert.component';

@Injectable()
export class AlertService {
  constructor(
    private bsModalRef: BsModalRef,
    private modalService: BsModalService
  ) {}

  success(text: any) {
    const initialState = {
      text: text
    };
    this.modalService.show(AlertComponent, {initialState});
  }
}

