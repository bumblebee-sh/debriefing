import { Component, OnInit, OnDestroy } from '@angular/core';

import { SnackBarService } from '@app/_services/snack-bar.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss']
})

export class SnackBarComponent implements OnInit, OnDestroy {
  message = '';
  show = false;
  subscribes: Subscription;
  close_time = 2000;
  err_snack_bar = false;
  constructor(
    private snackBarService: SnackBarService
  ) { }

  ngOnInit() {
    this.subscribes =  this.snackBarService.getSnackBar().subscribe(
      data => {
        this.closeTimer();
        this.show = true;
        this.err_snack_bar = data.err ? true : false;
        this.message = data.mes;
      }
    );
  }

  ngOnDestroy() {
    this.subscribes.unsubscribe();
  }

  close() {
    this.show = false;
  }

  closeTimer() {
    setTimeout( _ => {
      this.close();
    }, this.close_time);
  }
}
