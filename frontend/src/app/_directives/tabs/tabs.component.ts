import { Component, Input, ContentChildren, AfterContentInit } from '@angular/core';

@Component({
  selector: 'app-tab',
  template: `<ng-content *ngIf="active"></ng-content>`,
  styleUrls: ['./tabs.component.scss']
})

export class TabComponent {
  @Input() title;
  active = false;
  constructor() { }

}

@Component({
  selector: 'app-tabs',
  template: `
    <div class="tabs__top d-flex">
      <div class="tabs__item" *ngFor="let tab of tabs" [class.active]="tab.active" (click)="select_tab(tab)">
        {{ tab.title }}
      </div>
    </div>
    <ng-content></ng-content>
  `,
  styleUrls: ['./tabs.component.scss']
})

export class TabsComponent implements AfterContentInit {
  @ContentChildren(TabComponent) tabs: any;
  constructor() { }
  ngAfterContentInit() {
    const hash = window.location.hash;
    const active_tab = this.tabs.toArray().filter( el => {
      if ('#' + el.title.toUpperCase() === hash.toUpperCase()) {
        el.active = true;
        return el;
      }
    });
    if (!active_tab.length) {
      this.select_tab(this.tabs.first, false);
    }
    // this.tabs.toArray().forEach( el => console.warn(el) );
  }

  select_tab(item, fl = true) {
    this.tabs.toArray().forEach( el => el.active = false );
    if (fl) {
      window.location.hash = item.title;
    }
    item.active = true;
  }
}
