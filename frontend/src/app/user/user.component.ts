import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit, OnDestroy {
  subscriptions: Subscription;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
  ) {}

  ngOnInit() {
    this.titleService.setTitle(this.activatedRoute.snapshot.firstChild.data['title']);
    this.subscriptions = this.router.events
      .filter(e => e instanceof NavigationEnd)
      .subscribe(e => this.titleService.setTitle(this.activatedRoute.snapshot.firstChild.data['title']));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
