import { Component, OnInit, OnDestroy } from '@angular/core';

import { NotificationService, SnackBarService } from '@app/_services';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit, OnDestroy {
  text: string ;
  show = false;
  hide = false;
  subscribes: Subscription;

  constructor(
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.subscribes = this.notificationService.get_notification().subscribe(
      data => {
        this.text = data;
        this.show_notification();
      },
      err => console.log('123')
    );
  }

  ngOnDestroy() {
    this.subscribes.unsubscribe();
  }

  show_notification = () => this.show = !this.show;

  hide_notification = () => {
    this.hide = !this.hide;
    setTimeout(() => {
      this.text = null;
      this.show_notification();
      this.hide = false;
    }, 300);
  }
}
